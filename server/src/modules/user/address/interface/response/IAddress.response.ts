import { AppResponse } from '../../../../../shared';
import { ApiOkResponse, ApiResponseProperty } from '@nestjs/swagger';
import { AddressEntity } from '../../entity';

export class AddressObject {
  @ApiResponseProperty({ type: () => AddressEntity })
  address: AddressEntity;
}

@ApiOkResponse({
  description: 'User fetched successfully',
  type: AddressResponse,
})
export class AddressResponse extends AppResponse {
  @ApiResponseProperty({ type: () => AddressObject })
  data: { address: AddressEntity };
}
