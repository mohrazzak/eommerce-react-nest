import { Address } from '@prisma/client';
import { IResponse } from 'src/shared';

export interface IGetAllAddressesResponse extends IResponse {
  data: { addresses: Address[] };
}
