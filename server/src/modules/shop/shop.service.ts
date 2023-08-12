import { Injectable } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { QueryDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private readonly productService: ProductService, private readonly prisma: PrismaService) {}

  async GetFilteredProducts(filters: QueryDto) {
    return this.productService.GetFilteredProducts(filters);
  }
  async getAllCategories() {
    return this.prisma.category.findMany();
  }
}
