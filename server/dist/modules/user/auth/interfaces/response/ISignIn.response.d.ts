import { IUserPublic } from '../../../../../modules/user/interfaces';
import { IResponse } from '../../../../../shared/interfaces';
export interface ISignInResponse extends IResponse {
    data: {
        user: IUserPublic;
        accessToken: string;
    };
}
