import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { QueryDto } from './dto/shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async GetFilteredProducts(@Query() filters: QueryDto) {
    console.log(filters);
    const products = await this.shopService.GetFilteredProducts(filters);
    const categories = await this.shopService.getAllCategories();

    return {
      data: { products, categories },
      message: 'Products fetched successfully',
      status: HttpStatus.ACCEPTED,
    };
  }
}
