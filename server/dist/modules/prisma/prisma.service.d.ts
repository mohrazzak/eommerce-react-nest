import { INestApplication } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { appConfig } from '../../config';
export declare class PrismaService extends PrismaClient {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigType<typeof appConfig>);
    enableShutdownHooks(app: INestApplication): Promise<void>;
    cleanDb(): Promise<[]>;
}
