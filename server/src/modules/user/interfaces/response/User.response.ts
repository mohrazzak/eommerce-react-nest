import { ApiOkResponse, ApiResponseProperty } from '@nestjs/swagger';
import { PublicUserEntity } from '..';
import { AppResponse } from '../../../../shared/interfaces';

class UserDataObject {
  @ApiResponseProperty({ type: () => PublicUserEntity })
  user: PublicUserEntity;
}

@ApiOkResponse({
  description: 'User fetched successfully',
  type: UserResponse,
})
export class UserResponse extends AppResponse {
  @ApiResponseProperty({ type: () => UserDataObject })
  data: {
    user: PublicUserEntity;
  };
}
