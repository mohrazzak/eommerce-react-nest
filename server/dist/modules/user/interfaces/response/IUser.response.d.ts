import { IUserPublic } from '../../../../modules/user/interfaces';
import { IResponse } from '../../../../shared/interfaces';
export declare class IUserResponse extends IResponse {
    data: {
        user: IUserPublic;
    };
}
