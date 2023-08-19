/// <reference types="multer" />
import { UserService } from './user.service';
import { IUserResponse } from './interfaces';
import { IAuthRequest } from '../../shared';
import { UpdateUserDTO, UpdateUserPasswordDTO, DeleteUserDTO } from './dto';
import { AuthService } from './auth/auth.service';
import { UploadService } from '../upload/upload.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private readonly uploadService;
    constructor(userService: UserService, authService: AuthService, uploadService: UploadService);
    getMe(req: IAuthRequest): Promise<IUserResponse>;
    DeleteUser(dto: DeleteUserDTO, req: IAuthRequest): Promise<IUserResponse>;
    updateUser(req: IAuthRequest, dto: UpdateUserDTO, image: Express.Multer.File): Promise<IUserResponse>;
    updateUserPassword(req: IAuthRequest, dto: UpdateUserPasswordDTO): Promise<IUserResponse>;
    updateImage(req: IAuthRequest, dto: UpdateUserPasswordDTO): Promise<IUserResponse>;
    uploadFile(req: IAuthRequest, image: Express.Multer.File): Promise<IUserResponse>;
}
