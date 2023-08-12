import { IsNumber } from 'class-validator';
import { CartItemUpdateQuantity } from './CartItemUpdateQuantity.dto';
import { Transform } from 'class-transformer';

export class CartItemDTO extends CartItemUpdateQuantity {
  @Transform(({ value }) => +value)
  @IsNumber()
  productId: number;
}
