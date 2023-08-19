"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/user/auth/auth.module");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const user_module_1 = require("./modules/user/user.module");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const address_module_1 = require("./modules/user/address/address.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const interception_1 = require("./interception");
const upload_service_1 = require("./modules/upload/upload.service");
const product_module_1 = require("./modules/shop/product/product.module");
const shop_module_1 = require("./modules/shop/shop.module");
const schedule_1 = require("@nestjs/schedule");
const cache_manager_1 = require("@nestjs/cache-manager");
const cart_module_1 = require("./modules/cart/cart.module");
const wishlist_module_1 = require("./modules/wishlist/wishlist.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: config_2.appConfigValidationSchema,
                load: [config_2.appConfig],
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            cache_manager_1.CacheModule.registerAsync({
                useClass: config_2.CacheService,
            }),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            address_module_1.AddressModule,
            product_module_1.ProductModule,
            shop_module_1.ShopModule,
            cart_module_1.CartModule,
            wishlist_module_1.WishlistModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interception_1.ErrorInterceptor,
            },
            upload_service_1.UploadService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map