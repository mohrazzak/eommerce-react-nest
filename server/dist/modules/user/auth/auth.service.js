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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon2 = require("argon2");
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../../modules/prisma/prisma.service");
const user_service_1 = require("../user.service");
const config_1 = require("../../../config");
const shared_1 = require("../../../shared");
let AuthService = class AuthService {
    constructor(prisma, userService, configService, jwtService) {
        this.prisma = prisma;
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.NODE_ENV = this.configService.environment;
        this.confirmationEmailHTML = (0, shared_1.readHtml)('dist/modules/user/auth/html/confirmEmail.html');
        this.resetPasswordHTML = (0, shared_1.readHtml)('dist/modules/user/auth/html/resetPassword.html');
        this.LINK_TO_REPLACE = 'confirmationLink';
        this.CLIENT_LOCAL_URL = this.configService.client.localUrl;
        this.CLIENT_PRODUCTION_URL = this.configService.client.productionUrl;
        this.SELECTED_CLIENT_URL = this.NODE_ENV === 'production' ? this.CLIENT_PRODUCTION_URL : this.CLIENT_LOCAL_URL;
        this.tokenDuration = this.configService.jwt.duration;
    }
    async sendActivateEmail(receiverEmail, confirmationEmailToken) {
        try {
            const EMAIL_TITLE = 'Confirm your account';
            return this.userService.sendMail(receiverEmail, EMAIL_TITLE, this.confirmationEmailHTML.replace(this.LINK_TO_REPLACE, `${this.SELECTED_CLIENT_URL}/activate?activateToken=${confirmationEmailToken}`));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async sendResetPasswordEmail(receiverEmail, resetPasswordEmailToken) {
        const EMAIL_TITLE = 'Reset your password';
        await this.userService.sendMail(receiverEmail, EMAIL_TITLE, this.resetPasswordHTML.replace(this.LINK_TO_REPLACE, `${this.SELECTED_CLIENT_URL}/reset-password/confirm?resetToken=${resetPasswordEmailToken}`));
    }
    async genToken(payload) {
        const token = await this.jwtService.signAsync(payload, { expiresIn: this.tokenDuration });
        return token;
    }
    async verifyToken(token) {
        try {
            const decodedToken = (await this.jwtService.verifyAsync(token));
            return decodedToken;
        }
        catch (error) {
            (0, shared_1.handleException)(error, 'Failed to verify your token');
        }
    }
    async activate(email) {
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
    async passwordValid(hashedPassword, password) {
        const result = await argon2.verify(hashedPassword, password);
        return result;
    }
    async hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(32);
        const hashedPassword = await argon2.hash(password, { salt });
        return hashedPassword;
    }
    async signUp(signUpDTO) {
        const hashedPassword = await this.hashPassword(signUpDTO.password);
        const createdUser = await this.userService.createUser({
            email: signUpDTO.email,
            name: signUpDTO.name,
            password: hashedPassword,
        });
        await this.userService.ScheduleDeleteInactive(createdUser.id);
        return createdUser;
    }
    async changePassword(email, newPassword) {
        const hashedPassword = await this.hashPassword(newPassword);
        const updatedUser = await this.prisma.user.update({ where: { email }, data: { password: hashedPassword } });
        return updatedUser;
    }
    async updateResetCode(updatedCode, email) {
        const updatedUser = await this.prisma.user.update({ where: { email }, data: { resetCode: updatedCode } });
        return updatedUser;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)(config_1.appConfig.KEY)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService, void 0, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map