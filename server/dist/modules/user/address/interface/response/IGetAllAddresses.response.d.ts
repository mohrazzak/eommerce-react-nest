import { Address } from '@prisma/client';
import { IResponse } from '../../../../../shared';
export interface IGetAllAddressesResponse extends IResponse {
    data: {
        addresses: Address[];
    };
}
