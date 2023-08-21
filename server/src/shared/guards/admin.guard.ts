import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PublicUserEntity } from '../../modules/user/interfaces';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: PublicUserEntity = request.user;
    return user && user.isAdmin;
  }
}
