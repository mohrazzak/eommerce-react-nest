"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const shop_service_1 = require("./shop.service");
const shop_dto_1 = require("./dto/shop.dto");
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    async GetFilteredProducts(filters) {
        console.log(filters);
        const products = await this.shopService.GetFilteredProducts(filters);
        const categories = await this.shopService.getAllCategories();
        return {
            data: { products, categories },
            message: 'Products fetched successfully',
            status: common_1.HttpStatus.ACCEPTED,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_dto_1.QueryDto]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "GetFilteredProducts", null);
ShopController = __decorate([
    (0, common_1.Controller)('shop'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
exports.ShopController = ShopController;
//# sourceMappingURL=shop.controller.js.map