import { BadRequestException, Inject, Injectable, Logger, NotFoundException, forwardRef } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IUserPublic } from './interfaces';
import { SignUpDTO } from './auth/dto';
import * as nodemailer from 'nodemailer';
import { ConfigType } from '@nestjs/config';
import { appConfig } from 'src/config';
import { exclude } from 'src/shared';
import { AuthService } from './auth/auth.service';
import { UpdateUserDTO, DeleteUserDTO, UpdateUserPasswordDTO } from './dto';
import { UploadService } from '../upload/upload.service';
import { CronJob } from 'cron';
import { addMinutes } from 'date-fns';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly uploadService: UploadService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}

  private EM_HOST = this.configService.mail.host;
  private EM_PORT = this.configService.mail.port;
  private EM_USER = this.configService.mail.user;
  private EM_PASSWORD = this.configService.mail.password;
  private EM_SENDER_NAME = this.configService.mail.senderName;
  private EM_SENDER_EMAIL = this.configService.mail.senderEmail;

  async getUserByIdPublic(id: string): Promise<IUserPublic | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    let userWithoutPassword: IUserPublic | null = null;

    if (user) userWithoutPassword = exclude<User, keyof User>(user, ['password']) as IUserPublic;

    return userWithoutPassword;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async createUser(signUpDTO: SignUpDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: signUpDTO.name,
        email: signUpDTO.email,
        password: signUpDTO.password,
      },
    });
    return user;
  }

  async sendMail(receiverEmail: string, subject: string, html: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: this.EM_HOST,
        port: this.EM_PORT,
        secure: true,
        auth: {
          user: this.EM_USER,
          pass: this.EM_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: `"${this.EM_SENDER_NAME}" <${this.EM_SENDER_EMAIL}>`,
        to: receiverEmail,
        subject: subject,
        html: html,
      });
    } catch (err) {
      // this.logger.error(err);
      throw new BadRequestException('cant send email', { cause: err });
    }
  }

  async deleteUserById(dto: DeleteUserDTO, userId: string): Promise<IUserPublic> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const oldPasswordCorrect = await this.authService.passwordValid(user.password, dto.password);
    if (!oldPasswordCorrect) throw new BadRequestException('Password incorrect');

    const deletedUser = await this.prisma.user.delete({ where: { id: userId } });

    const userWithoutPassword = exclude<User, keyof User>(deletedUser, ['password']) as IUserPublic;
    return userWithoutPassword;
  }

  async updateUser(dto: UpdateUserDTO, userId: string, image: Express.Multer.File): Promise<IUserPublic> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const passwordsMatch = await this.authService.passwordValid(user.password, dto.password);
    if (!passwordsMatch) throw new BadRequestException('Password incorrect');

    if (user?.imageURL && image) {
      const parts = user.imageURL.split('/');
      const publicIdWithExtension = parts[parts.indexOf('users') + 1];
      const publicId = `users/${publicIdWithExtension.split('.')[0]}`;

      await this.uploadService.deleteFile(publicId);
    }

    let updatedUser: User;
    if (image) {
      const data = await this.uploadService.uploadFile(image, 'users');
      updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { name: dto.name, phoneNumber: dto.phoneNumber, imageURL: data.secure_url },
      });
    } else {
      updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { name: dto.name, phoneNumber: dto.phoneNumber },
      });
    }

    const userWithoutPassword = exclude<User, keyof User>(updatedUser, ['password']) as IUserPublic;
    return userWithoutPassword;
  }

  async updatePassword(dto: UpdateUserPasswordDTO, userId: string): Promise<IUserPublic> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const oldPasswordCorrect = await this.authService.passwordValid(user.password, dto.oldPassword);
    if (!oldPasswordCorrect) throw new BadRequestException('Password incorrect');

    const hashedPassword = await this.authService.hashPassword(dto.newPassword);
    const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });

    const userWithoutPassword = exclude<User, keyof User>(updatedUser, ['password']) as IUserPublic;
    return userWithoutPassword;
  }

  async updateUserImage(userId: string, image: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user?.imageURL) {
      const parts = user.imageURL.split('/');
      const publicIdWithExtension = parts[parts.indexOf('users') + 1];
      const publicId = `users/${publicIdWithExtension.split('.')[0]}`;

      await this.uploadService.deleteFile(publicId);
    }

    const data = await this.uploadService.uploadFile(image, 'users');
    const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { imageURL: data.secure_url } });

    return updatedUser;
  }

  async ScheduleDeleteInactive(userId: string) {
    const scheduledTime = addMinutes(new Date(), 1);
    console.log(scheduledTime);
    const job = new CronJob(
      scheduledTime,
      async () => {
        const deletedUser = await this.deleteUserIfInActive(userId);
        if (deletedUser) this.logger.log(`User ${deletedUser.name} deleted due to the inactivity of his account`);
        job.stop();
      },
      null,
      true,
    );
  }

  async deleteUserIfInActive(userId: string): Promise<null | User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isActive) return null;
    return this.prisma.user.delete({ where: { id: userId } });
  }
}
