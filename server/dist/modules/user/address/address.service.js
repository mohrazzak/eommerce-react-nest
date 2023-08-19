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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../modules/prisma/prisma.service");
const shared_1 = require("../../../shared");
let AddressService = class AddressService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUserAddresses(userId) {
        try {
            const addresses = this.prisma.address.findMany({ where: { userId } });
            return addresses;
        }
        catch (err) {
            throw (0, shared_1.handleException)(err, 'This is ');
        }
    }
    async addAddress(dto, userId) {
        const address = await this.prisma.address.create({ data: Object.assign(Object.assign({}, dto), { userId }) });
        return address;
    }
    async updateAddress(dto, addressId, userId) {
        const address = await this.findAddressById(addressId);
        this.ensureUserOwnsAddress(address, userId);
        const updatedAddress = await this.prisma.address.update({ where: { id: addressId }, data: Object.assign({}, dto) });
        return updatedAddress;
    }
    async deleteAddress(addressId, userId) {
        const address = await this.findAddressById(addressId);
        this.ensureUserOwnsAddress(address, userId);
        const deletedAddress = await this.prisma.address.delete({ where: { id: addressId } });
        return deletedAddress;
    }
    async setDefaultAddress(userId, addressId) {
        const address = await this.findAddressById(addressId);
        this.ensureUserOwnsAddress(address, userId);
        await this.prisma.address.updateMany({ where: { userId, isDefault: true }, data: { isDefault: false } });
        const updatedAddress = await this.prisma.address.update({ where: { id: addressId }, data: { isDefault: true } });
        return updatedAddress;
    }
    async findAddressById(addressId) {
        const address = await this.prisma.address.findUnique({ where: { id: addressId } });
        if (!address)
            throw new common_1.NotFoundException('Address not found');
        return address;
    }
    ensureUserOwnsAddress(address, userId) {
        if (address.userId !== userId)
            throw new common_1.BadRequestException("User doesn't own this address");
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map