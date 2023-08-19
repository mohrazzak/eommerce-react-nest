import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../../config';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigType<typeof appConfig>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
