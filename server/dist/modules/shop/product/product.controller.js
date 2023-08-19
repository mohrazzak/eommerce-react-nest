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
exports.ProductController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../modules/prisma/prisma.service");
let ProductController = class ProductController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProductById(productId) {
        const product = await this.prisma.product.findUnique({ where: { id: productId }, include: { Tags: true, Product_Images: true } });
        const userWishlist = await this.prisma.user.findFirst({ include: { CartItems: true, WishlistItems: true } });
        return {
            data: { product, userWishlist },
            message: 'Product fetched successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
__decorate([
    (0, common_1.Get)('/:productId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map