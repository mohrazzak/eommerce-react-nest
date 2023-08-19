"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../modules/prisma/prisma.service");
const nodemailer = require("nodemailer");
const config_1 = require("../../config");
const shared_1 = require("../../shared");
const auth_service_1 = require("./auth/auth.service");
const upload_service_1 = require("../upload/upload.service");
const cron_1 = require("cron");
const date_fns_1 = require("date-fns");
let UserService = UserService_1 = class UserService {
    constructor(prisma, authService, uploadService, configService) {
        this.prisma = prisma;
        this.authService = authService;
        this.uploadService = uploadService;
        this.configService = configService;
        this.logger = new common_1.Logger(UserService_1.name);
        this.EM_HOST = this.configService.mail.host;
        this.EM_PORT = this.configService.mail.port;
        this.EM_USER = this.configService.mail.user;
        this.EM_PASSWORD = this.configService.mail.password;
        this.EM_SENDER_NAME = this.configService.mail.senderName;
        this.EM_SENDER_EMAIL = this.configService.mail.senderEmail;
    }
    async getUserByIdPublic(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { CartItems: { include: { Product: true } } },
        });
        let userWithoutPassword = null;
        if (user)
            userWithoutPassword = (0, shared_1.exclude)(user, ['password']);
        return userWithoutPassword;
    }
    async getUserByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    async createUser(signUpDTO) {
        const user = await this.prisma.user.create({
            data: {
                name: signUpDTO.name,
                email: signUpDTO.email,
                password: signUpDTO.password,
            },
        });
        return user;
    }
    async sendMail(receiverEmail, subject, html) {
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
        }
        catch (err) {
            throw new common_1.BadRequestException('cant send email', { cause: err });
        }
    }
    async deleteUserById(dto, userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const oldPasswordCorrect = await this.authService.passwordValid(user.password, dto.password);
        if (!oldPasswordCorrect)
            throw new common_1.BadRequestException('Password incorrect');
        const deletedUser = await this.prisma.user.delete({ where: { id: userId } });
        const userWithoutPassword = (0, shared_1.exclude)(deletedUser, ['password']);
        return userWithoutPassword;
    }
    async updateUser(dto, userId, image) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const passwordsMatch = await this.authService.passwordValid(user.password, dto.password);
        if (!passwordsMatch)
            throw new common_1.BadRequestException('Password incorrect');
        if ((user === null || user === void 0 ? void 0 : user.imageURL) && image) {
            const parts = user.imageURL.split('/');
            const publicIdWithExtension = parts[parts.indexOf('users') + 1];
            const publicId = `users/${publicIdWithExtension.split('.')[0]}`;
            await this.uploadService.deleteFile(publicId);
        }
        let updatedUser;
        if (image) {
            const data = await this.uploadService.uploadFile(image, 'users');
            updatedUser = await this.prisma.user.update({
                where: { id: userId },
                data: { name: dto.name, phoneNumber: dto.phoneNumber, imageURL: data.secure_url },
            });
        }
        else {
            updatedUser = await this.prisma.user.update({
                where: { id: userId },
                data: { name: dto.name, phoneNumber: dto.phoneNumber },
            });
        }
        const userWithoutPassword = (0, shared_1.exclude)(updatedUser, ['password']);
        return userWithoutPassword;
    }
    async updatePassword(dto, userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const oldPasswordCorrect = await this.authService.passwordValid(user.password, dto.oldPassword);
        if (!oldPasswordCorrect)
            throw new common_1.BadRequestException('Password incorrect');
        const hashedPassword = await this.authService.hashPassword(dto.newPassword);
        const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
        const userWithoutPassword = (0, shared_1.exclude)(updatedUser, ['password']);
        return userWithoutPassword;
    }
    async updateUserImage(userId, image) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user === null || user === void 0 ? void 0 : user.imageURL) {
            const parts = user.imageURL.split('/');
            const publicIdWithExtension = parts[parts.indexOf('users') + 1];
            const publicId = `users/${publicIdWithExtension.split('.')[0]}`;
            await this.uploadService.deleteFile(publicId);
        }
        const data = await this.uploadService.uploadFile(image, 'users');
        const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { imageURL: data.secure_url } });
        return updatedUser;
    }
    async ScheduleDeleteInactive(userId) {
        const scheduledTime = (0, date_fns_1.addMinutes)(new Date(), 1);
        console.log(scheduledTime);
        const job = new cron_1.CronJob(scheduledTime, async () => {
            const deletedUser = await this.deleteUserIfInActive(userId);
            if (deletedUser)
                this.logger.log(`User ${deletedUser.name} deleted due to the inactivity of his account`);
            job.stop();
        }, null, true);
    }
    async deleteUserIfInActive(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user.isActive)
            return null;
        return this.prisma.user.delete({ where: { id: userId } });
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(3, (0, common_1.Inject)(config_1.appConfig.KEY)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService,
        upload_service_1.UploadService, void 0])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map