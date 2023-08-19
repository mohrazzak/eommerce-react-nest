import { PrismaService } from '../../../modules/prisma/prisma.service';
import { AddressDTO } from './dto';
import { Address } from '@prisma/client';
export declare class AddressService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUserAddresses(userId: string): Promise<Address[]>;
    addAddress(dto: AddressDTO, userId: string): Promise<Address>;
    updateAddress(dto: AddressDTO, addressId: number, userId: string): Promise<Address>;
    deleteAddress(addressId: number, userId: string): Promise<Address>;
    setDefaultAddress(userId: string, addressId: number): Promise<Address>;
    findAddressById(addressId: number): Promise<Address>;
    ensureUserOwnsAddress(address: Address, userId: string): void;
}
