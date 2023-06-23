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

    return {
      data: { products },
      message: 'Products fetched successfully',
      status: HttpStatus.ACCEPTED,
    };
  }
}
