import { Address } from '@prisma/client';
import { IResponse } from '../../../../../shared';

export interface IAddressResponse extends IResponse {
  data: { address: Address };
}
