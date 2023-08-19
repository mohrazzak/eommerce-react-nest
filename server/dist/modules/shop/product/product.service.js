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
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../modules/prisma/prisma.service");
let ProductService = ProductService_1 = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ProductService_1.name);
    }
    async GetFilteredProducts(filters) {
        const whereClause = {};
        if (filters.name)
            whereClause.name = { contains: filters.name };
        if (filters.categoryId)
            whereClause.categoryId = filters.categoryId;
        if (filters.rating)
            whereClause.averageRating = filters.rating;
        if (filters.priceRange)
            whereClause.price = { gte: filters.priceRange.min, lte: filters.priceRange.max };
        this.logger.log(`WhereClause of products:`, whereClause);
        const products = await this.prisma.product.findMany({ where: whereClause, include: { Category: true, Reviews: true } });
        return products;
    }
};
ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map