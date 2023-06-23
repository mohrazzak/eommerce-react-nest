import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryDto } from '../dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly prisma: PrismaService) {}
  async GetFilteredProducts(filters: QueryDto) {
    const whereClause: Prisma.ProductWhereInput = {};

    // Check for name
    if (filters.name) whereClause.name = { contains: filters.name };
    if (filters.categoryId) whereClause.categoryId = filters.categoryId;
    if (filters.rating) whereClause.categoryId = filters.rating;

    // Check for price range availability
    if (filters.priceRange) whereClause.price = { gte: filters.priceRange.min, lte: filters.priceRange.max };

    this.logger.log(`WhereClause of products:`, whereClause);
    const products = await this.prisma.product.findMany({ where: whereClause, include: { Category: true, Reviews: true } });
    return products;
  }
}
