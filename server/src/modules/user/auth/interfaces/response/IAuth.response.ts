import { ApiOkResponse, ApiResponseProperty } from '@nestjs/swagger';
import { PublicUserEntity, UserResponse } from '../../../../../modules/user/interfaces';
import { AppResponse } from '../../../../../shared';
class DataObject {
  @ApiResponseProperty({ type: () => PublicUserEntity })
  user: PublicUserEntity;
}

@ApiOkResponse({
  description: 'User fetched successfully',
  type: IAuthResponse,
})
export class IAuthResponse extends UserResponse {}
