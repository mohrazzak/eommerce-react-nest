import { IUserPublic } from 'src/modules/user/interfaces';
import { IResponse } from 'src/shared/interfaces';

export interface ISignInResponse extends IResponse {
  data: {
    user: IUserPublic;
    accessToken: string;
  };
}
