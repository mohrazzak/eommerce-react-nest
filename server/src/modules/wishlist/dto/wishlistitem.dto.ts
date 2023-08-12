import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class WishlistItemDTO {
  @Transform(({ value }) => +value)
  @IsNumber()
  productId: number;
}
