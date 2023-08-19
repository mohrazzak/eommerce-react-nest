import { AddressService } from './address.service';
import { IAuthRequest } from '../../../shared';
import { IAddressResponse, IGetAllAddressesResponse } from './interface';
import { AddressDTO } from './dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    getAllAddresses(req: IAuthRequest): Promise<IGetAllAddressesResponse>;
    addAddress(req: IAuthRequest, dto: AddressDTO): Promise<IAddressResponse>;
    updateAddress(req: IAuthRequest, dto: AddressDTO, addressId: number): Promise<IAddressResponse>;
    deleteAddress(req: IAuthRequest, addressId: number): Promise<IAddressResponse>;
    setDefaultAddress(req: IAuthRequest, addressId: number): Promise<IAddressResponse>;
}
