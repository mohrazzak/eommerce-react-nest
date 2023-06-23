import { Injectable } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { QueryDto } from './dto';

@Injectable()
export class ShopService {
  constructor(private readonly productService: ProductService) {}

  async GetFilteredProducts(filters: QueryDto) {
    return this.productService.GetFilteredProducts(filters);
  }
}
