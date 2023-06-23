import { Module } from '@nestjs/common';
import { AuthModule } from './modules/user/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigValidationSchema, appConfig, CacheService } from './config';
import { AddressModule } from './modules/user/address/address.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interception';
import { UploadService } from './modules/upload/upload.service';
import { ProductModule } from './modules/shop/product/product.module';
import { ShopModule } from './modules/shop/shop.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: appConfigValidationSchema,
      load: [appConfig],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    AddressModule,
    ProductModule,
    ShopModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    UploadService,
  ],
})
export class AppModule {}
