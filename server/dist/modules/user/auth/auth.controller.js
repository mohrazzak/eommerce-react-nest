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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../../../modules/user/user.service");
const shared_1 = require("../../../shared");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async signup(dto) {
        const userExists = await this.userService.getUserByEmail(dto.email);
        if (userExists)
            throw new common_1.BadRequestException('User already exists');
        const user = await this.authService.signUp(dto);
        const activationToken = await this.authService.genToken({
            email: user.email,
            id: user.id,
            name: user.name,
            isActive: user.isActive,
        });
        await this.authService.sendActivateEmail(user.email, activationToken);
        const userWithoutPassword = (0, shared_1.exclude)(user, ['password']);
        return {
            data: { user: userWithoutPassword },
            message: 'Confirmation email sent to your mail',
            statusCode: common_1.HttpStatus.CREATED,
        };
    }
    async activate(dto) {
        const { email } = await this.authService.verifyToken(dto.activateToken);
        const user = await this.userService.getUserByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.isActive)
            throw new common_1.BadRequestException('User is already active');
        await this.authService.activate(email);
        const userWithoutPassword = (0, shared_1.exclude)(user, ['password']);
        return {
            message: 'User activated, You can now login',
            data: { user: userWithoutPassword },
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async signin(dto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const passwordValid = await this.authService.passwordValid(user.password, dto.password);
        if (!passwordValid)
            throw new common_1.BadRequestException('Password invalid');
        if (!user.isActive)
            throw new common_1.BadRequestException('User is not active');
        const accessToken = await this.authService.genToken({
            id: user.id,
            email: user.email,
            name: user.name,
            isActive: user.isActive,
        });
        const userWithoutPassword = (0, shared_1.exclude)(user, ['password']);
        return {
            data: {
                user: userWithoutPassword,
                accessToken,
            },
            message: 'Signed in successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async resetPassword(dto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const resetToken = await this.authService.genToken({
            email: user.email,
            id: user.id,
            name: user.name,
            isActive: user.isActive,
        });
        await this.authService.sendResetPasswordEmail(user.email, resetToken);
        await this.authService.updateResetCode(resetToken, user.email);
        const userWithoutPassword = (0, shared_1.exclude)(user, ['password']);
        return {
            message: 'Confirmation email sent to your mail',
            data: { user: userWithoutPassword },
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async resetPasswordConfirmation(dto) {
        const decodedToken = await this.authService.verifyToken(dto.resetToken);
        const user = await this.userService.getUserByEmail(decodedToken.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const userRequestedReset = user.resetCode === dto.resetToken;
        if (!userRequestedReset)
            throw new common_1.BadRequestException('Invalid token');
        await this.authService.changePassword(user.email, dto.password);
        await this.authService.updateResetCode(null, user.email);
        const userWithoutPassword = (await (0, shared_1.exclude)(user, ['password']));
        return {
            message: 'Password changed',
            data: { user: userWithoutPassword },
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignUpDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/activate'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ActivateDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activate", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('/reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPasswordConfirmationDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPasswordConfirmation", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map