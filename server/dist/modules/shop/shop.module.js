"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModule = void 0;
const common_1 = require("@nestjs/common");
const shop_service_1 = require("./shop.service");
const shop_controller_1 = require("./shop.controller");
const product_module_1 = require("./product/product.module");
let ShopModule = class ShopModule {
};
ShopModule = __decorate([
    (0, common_1.Module)({
        imports: [product_module_1.ProductModule],
        providers: [shop_service_1.ShopService],
        controllers: [shop_controller_1.ShopController],
    })
], ShopModule);
exports.ShopModule = ShopModule;
//# sourceMappingURL=shop.module.js.map