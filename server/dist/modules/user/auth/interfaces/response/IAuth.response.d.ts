import { IUserPublic } from '../../../../../modules/user/interfaces';
import { IResponse } from '../../../../../shared';
export interface IAuthResponse extends IResponse {
    data: {
        user: IUserPublic;
    };
}
