import { ISignInResponse, IAuthResponse } from './interfaces';
import { ActivateDTO, ResetPasswordConfirmationDTO, ResetPasswordDTO, SignInDTO, SignUpDTO } from './dto';
import { AuthService } from './auth.service';
import { UserService } from '../../../modules/user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signup(dto: SignUpDTO): Promise<IAuthResponse>;
    activate(dto: ActivateDTO): Promise<IAuthResponse>;
    signin(dto: SignInDTO): Promise<ISignInResponse>;
    resetPassword(dto: ResetPasswordDTO): Promise<IAuthResponse>;
    resetPasswordConfirmation(dto: ResetPasswordConfirmationDTO): Promise<IAuthResponse>;
}
