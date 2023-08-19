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
exports.AddressController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const shared_1 = require("../../../shared");
const dto_1 = require("./dto");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async getAllAddresses(req) {
        const addresses = await this.addressService.getAllUserAddresses(req.user.id);
        return {
            message: 'Addresses fetched successfully',
            data: { addresses },
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async addAddress(req, dto) {
        const address = await this.addressService.addAddress(dto, req.user.id);
        return {
            message: 'Address added successfully',
            data: { address },
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async updateAddress(req, dto, addressId) {
        const address = await this.addressService.updateAddress(dto, +addressId, req.user.id);
        return {
            message: 'Address updated successfully',
            data: { address },
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async deleteAddress(req, addressId) {
        const address = await this.addressService.deleteAddress(+addressId, req.user.id);
        return {
            message: 'Address deleted successfully',
            data: { address },
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async setDefaultAddress(req, addressId) {
        const address = await this.addressService.setDefaultAddress(req.user.id, +addressId);
        return {
            message: 'Address is now default',
            data: { address },
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAllAddresses", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AddressDTO]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "addAddress", null);
__decorate([
    (0, common_1.Put)(':addressId'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AddressDTO, Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)(':addressId'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.Patch)(':addressId'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "setDefaultAddress", null);
AddressController = __decorate([
    (0, common_1.Controller)('users/addresses'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map