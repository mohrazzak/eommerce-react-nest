import { AppResponse } from 'shared';
import { AddressEntity } from '../../entity';
import { ApiOkResponse, ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
class AddressesObject {
  @ApiProperty({ type: () => AddressEntity, isArray: true })
  addresses: AddressEntity[];
}

@ApiOkResponse({
  description: 'User fetched successfully',
  type: AllAddressesResponse,
})
export class AllAddressesResponse extends AppResponse {
  @ApiResponseProperty({ type: () => AddressesObject })
  data: { addresses: AddressEntity[] };
}
