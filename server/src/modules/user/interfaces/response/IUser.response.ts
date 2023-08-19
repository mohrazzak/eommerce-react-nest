import { ApiProperty, ApiOkResponse } from '@nestjs/swagger';
import { IUserPublic } from '../../../../modules/user/interfaces';
import { IResponse } from '../../../../shared/interfaces';

@ApiOkResponse({
  description: 'User fetched successfully',
  type: IUserResponse,
})
export class IUserResponse extends IResponse {
  @ApiProperty({ type: () => IUserPublic })
  data: {
    user: IUserPublic;
  };
}
