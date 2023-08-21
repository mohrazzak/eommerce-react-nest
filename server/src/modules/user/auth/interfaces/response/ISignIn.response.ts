import { PublicUserEntity } from '../../../../../modules/user/interfaces';
import { AppResponse } from '../../../../../shared/interfaces';

export interface ISignInResponse extends AppResponse {
  data: {
    user: PublicUserEntity;
    accessToken: string;
  };
}
