import { IUserPublic } from 'src/modules/user/interfaces';
import { IResponse } from 'src/shared/interfaces';

export interface IUserResponse extends IResponse {
  data: {
    user: IUserPublic;
  };
}
