/// <reference types="multer" />
import { User } from '@prisma/client';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { IUserPublic } from './interfaces';
import { SignUpDTO } from './auth/dto';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '../../config';
import { AuthService } from './auth/auth.service';
import { UpdateUserDTO, DeleteUserDTO, UpdateUserPasswordDTO } from './dto';
import { UploadService } from '../upload/upload.service';
export declare class UserService {
    private readonly prisma;
    private readonly authService;
    private readonly uploadService;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, authService: AuthService, uploadService: UploadService, configService: ConfigType<typeof appConfig>);
    private EM_HOST;
    private EM_PORT;
    private EM_USER;
    private EM_PASSWORD;
    private EM_SENDER_NAME;
    private EM_SENDER_EMAIL;
    getUserByIdPublic(id: string): Promise<IUserPublic | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(signUpDTO: SignUpDTO): Promise<User>;
    sendMail(receiverEmail: string, subject: string, html: string): Promise<void>;
    deleteUserById(dto: DeleteUserDTO, userId: string): Promise<IUserPublic>;
    updateUser(dto: UpdateUserDTO, userId: string, image: Express.Multer.File): Promise<IUserPublic>;
    updatePassword(dto: UpdateUserPasswordDTO, userId: string): Promise<IUserPublic>;
    updateUserImage(userId: string, image: Express.Multer.File): Promise<User>;
    ScheduleDeleteInactive(userId: string): Promise<void>;
    deleteUserIfInActive(userId: string): Promise<null | User>;
}
