import { Address } from '@prisma/client';
import { IResponse } from 'src/shared';

export interface IAddressResponse extends IResponse {
  data: { address: Address };
}
