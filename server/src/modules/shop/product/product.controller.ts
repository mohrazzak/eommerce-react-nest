import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Controller('product')
export class ProductController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/:productId')
  async getProductById(@Param('productId', ParseIntPipe) productId: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId }, include: { Tags: true, Product_Images: true } });
    const userWishlist = await this.prisma.user.findFirst({ include: { CartItems: true, WishlistItems: true } });
    return {
      data: { product, userWishlist },
      message: 'Product fetched successfully',
      statusCode: HttpStatus.OK,
    };
  } 
}
