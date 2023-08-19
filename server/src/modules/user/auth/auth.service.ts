import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { User } from '@prisma/client';
import { Inject, Injectable, InternalServerErrorException, forwardRef } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { UserService } from '../user.service';
import { appConfig } from '../../../config';
import { handleException, readHtml } from '../../../shared';
import { SignUpDTO } from './dto';
import { ITokenPayload } from './interfaces';

@Injectable()
export class AuthService {
  private NODE_ENV = this.configService.environment;

  // private confirmationEmailHTML = readHtml('dist/modules/user/auth/html/confirmEmail.html');
  // private resetPasswordHTML = readHtml('dist/modules/user/auth/html/resetPassword.html');

  private confirmationEmailHTML = '';
  private resetPasswordHTML = '';
  private LINK_TO_REPLACE = 'confirmationLink';

  private CLIENT_LOCAL_URL = this.configService.client.localUrl;
  private CLIENT_PRODUCTION_URL = this.configService.client.productionUrl;
  private SELECTED_CLIENT_URL = this.NODE_ENV === 'production' ? this.CLIENT_PRODUCTION_URL : this.CLIENT_LOCAL_URL;

  private tokenDuration = this.configService.jwt.duration;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
    private jwtService: JwtService,
  ) {}

  async sendActivateEmail(receiverEmail: string, confirmationEmailToken: string): Promise<void> {
    try {
      const EMAIL_TITLE = 'Confirm your account';
      return this.userService.sendMail(
        receiverEmail,
        EMAIL_TITLE,
        this.confirmationEmailHTML.replace(
          this.LINK_TO_REPLACE,
          `${this.SELECTED_CLIENT_URL}/activate?activateToken=${confirmationEmailToken}`,
        ),
      );
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async sendResetPasswordEmail(receiverEmail: string, resetPasswordEmailToken: string): Promise<void> {
    const EMAIL_TITLE = 'Reset your password';
    await this.userService.sendMail(
      receiverEmail,
      EMAIL_TITLE,
      this.resetPasswordHTML.replace(
        this.LINK_TO_REPLACE,
        `${this.SELECTED_CLIENT_URL}/reset-password/confirm?resetToken=${resetPasswordEmailToken}`,
      ),
    );
  }

  async genToken(payload: ITokenPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload, { expiresIn: this.tokenDuration });
    return token;
  }

  async verifyToken(token: string): Promise<ITokenPayload> {
    try {
      const decodedToken = (await this.jwtService.verifyAsync(token)) as ITokenPayload;
      return decodedToken;
    } catch (error) {
      handleException(error, 'Failed to verify your token');
    }
  }

  async activate(email: string): Promise<User> {
    const activatedUser = await this.prisma.user.update({
      data: {
        isActive: true,
      },
      where: {
        email,
      },
    });
    return activatedUser;
  }

  async passwordValid(hashedPassword: string, password: string): Promise<boolean> {
    const result = await argon2.verify(hashedPassword, password);
    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });
    return hashedPassword;
  }

  async signUp(signUpDTO: SignUpDTO): Promise<User> {
    const hashedPassword = await this.hashPassword(signUpDTO.password);
    const createdUser = await this.userService.createUser({
      email: signUpDTO.email,
      name: signUpDTO.name,
      password: hashedPassword,
    });
    await this.userService.ScheduleDeleteInactive(createdUser.id);
    return createdUser;
  }

  async changePassword(email: string, newPassword: string): Promise<User> {
    const hashedPassword = await this.hashPassword(newPassword);
    const updatedUser = await this.prisma.user.update({ where: { email }, data: { password: hashedPassword } });
    return updatedUser;
  }

  async updateResetCode(updatedCode: string | null, email: string): Promise<User> {
    const updatedUser = await this.prisma.user.update({ where: { email }, data: { resetCode: updatedCode } });
    return updatedUser;
  }
}
