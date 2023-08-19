import { IUserPublic } from 'src/modules/user/interfaces';
import { IResponse } from 'src/shared';

export interface IAuthResponse extends IResponse {
  data: {
    user: IUserPublic;
  };
}
