import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { appConfig } from '../../config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(AuthGuardMessage.TOKEN_INVALID);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(AuthGuardMessage.TOKEN_INVALID);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

enum AuthGuardMessage {
  TOKEN_INVALID = 'Token invalid',
  ACCOUNT_NOT_ACTIVE = 'Account not active',
}
