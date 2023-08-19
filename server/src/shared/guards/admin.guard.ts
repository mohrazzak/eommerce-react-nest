import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IUserPublic } from '../../modules/user/interfaces';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: IUserPublic = request.user;
    return user && user.isAdmin;
  }
}
