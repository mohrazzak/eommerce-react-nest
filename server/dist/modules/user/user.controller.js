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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const interfaces_1 = require("./interfaces");
const shared_1 = require("../../shared");
const dto_1 = require("./dto");
const auth_service_1 = require("./auth/auth.service");
const upload_service_1 = require("../upload/upload.service");
const platform_express_1 = require("@nestjs/platform-express");
const FileValidationPipe_1 = require("../../shared/pipes/FileValidationPipe");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService, authService, uploadService) {
        this.userService = userService;
        this.authService = authService;
        this.uploadService = uploadService;
    }
    async getMe(req) {
        const user = await this.userService.getUserByIdPublic(req.user.id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return {
            data: { user },
            message: 'User fetched successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async DeleteUser(dto, req) {
        const user = await this.userService.deleteUserById(dto, req.user.id);
        return {
            data: { user },
            message: 'User deleted Successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async updateUser(req, dto, image) {
        const user = await this.userService.updateUser(dto, req.user.id, image);
        return {
            data: { user },
            message: 'User updated Successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async updateUserPassword(req, dto) {
        const user = await this.userService.updatePassword(dto, req.user.id);
        return {
            data: { user },
            message: 'User updated Successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async updateImage(req, dto) {
        const user = await this.userService.updatePassword(dto, req.user.id);
        return {
            data: { user },
            message: 'User updated Successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async uploadFile(req, image) {
        const user = await this.userService.updateUserImage(req.user.id, image);
        return { data: { user }, message: 'User Image updated Successfully', statusCode: common_1.HttpStatus.OK };
    }
};
__decorate([
    (0, common_1.Get)('/me'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user information' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'User fetched successfully', type: interfaces_1.IUserResponse }),
    openapi.ApiResponse({ status: 200, type: require("./interfaces/response/IUser.response").IUserResponse }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./interfaces/response/IUser.response").IUserResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteUserDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "DeleteUser", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imageURL')),
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./interfaces/response/IUser.response").IUserResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(FileValidationPipe_1.FileValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateUserDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)('/update-password'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./interfaces/response/IUser.response").IUserResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateUserPasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPassword", null);
__decorate([
    (0, common_1.Patch)('/update-password'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./interfaces/response/IUser.response").IUserResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateUserPasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateImage", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.Patch)('image'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./interfaces/response/IUser.response").IUserResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)(FileValidationPipe_1.FileValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        upload_service_1.UploadService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map