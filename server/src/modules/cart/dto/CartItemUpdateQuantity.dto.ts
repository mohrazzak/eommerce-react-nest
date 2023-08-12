import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CartItemUpdateQuantity {
  @Transform(({ value }) => +value)
  @IsNumber()
  quantity: number;
}
