import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
