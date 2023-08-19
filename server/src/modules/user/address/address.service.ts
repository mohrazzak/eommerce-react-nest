import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { AddressDTO } from './dto';
import { Address } from '@prisma/client';
import { handleException } from '../../../shared';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUserAddresses(userId: string) {
    try {
      const addresses = this.prisma.address.findMany({ where: { userId } });
      return addresses;
    } catch (err) {
      throw handleException(err, 'This is ');
    }
  }

  async addAddress(dto: AddressDTO, userId: string) {
    const address = await this.prisma.address.create({ data: { ...dto, userId } });
    return address;
  }

  async updateAddress(dto: AddressDTO, addressId: number, userId: string) {
    const address = await this.findAddressById(addressId);
    this.ensureUserOwnsAddress(address, userId);

    const updatedAddress = await this.prisma.address.update({ where: { id: addressId }, data: { ...dto } });
    return updatedAddress;
  }

  async deleteAddress(addressId: number, userId: string) {
    const address = await this.findAddressById(addressId);
    this.ensureUserOwnsAddress(address, userId);

    const deletedAddress = await this.prisma.address.delete({ where: { id: addressId } });
    return deletedAddress;
  }

  async setDefaultAddress(userId: string, addressId: number) {
    const address = await this.findAddressById(addressId);
    this.ensureUserOwnsAddress(address, userId);

    await this.prisma.address.updateMany({ where: { userId, isDefault: true }, data: { isDefault: false } });
    const updatedAddress = await this.prisma.address.update({ where: { id: addressId }, data: { isDefault: true } });
    return updatedAddress;
  }

  async findAddressById(addressId: number) {
    const address = await this.prisma.address.findUnique({ where: { id: addressId } });
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }

  ensureUserOwnsAddress(address: Address, userId: string) {
    if (address.userId !== userId) throw new BadRequestException("User doesn't own this address");
  }
}
