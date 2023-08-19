import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard, IAuthRequest } from '../../shared';
import { CartItemDTO, CartItemUpdateQuantity } from './dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserCartItems(@Req() req: IAuthRequest) {
    return this.cartService.getCartItemsByUserId(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async addCartItem(@Req() req: IAuthRequest, @Body() cartItemDTO: CartItemDTO) {
    return this.cartService.addCartItem(req.user.id, cartItemDTO);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateCartItem(@Req() req: IAuthRequest, @Body() cartItemDTO: CartItemDTO, @Param('cartItemId', ParseIntPipe) cartItemId: number) {
    return this.cartService.updateCartItem(req.user.id, cartItemDTO, cartItemId);
  }

  @Patch('/:cartItemId')
  @UseGuards(AuthGuard)
  async updateCartItemQuantity(
    @Req() req: IAuthRequest,
    @Body() cartItemDTO: CartItemUpdateQuantity,
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
  ) {
    const cartItem = await this.cartService.updateCartItemQuantity(req.user.id, cartItemId, cartItemDTO.quantity);

    return {
      data: { cartItem },
      message: 'CartItem updated successfully',
      statusCode: 200,
    };
  }

  @Delete('/:cartItemId')
  @UseGuards(AuthGuard)
  async deleteCartItem(@Req() req: IAuthRequest, @Param('cartItemId', ParseIntPipe) cartItemId: number) {
    console.log('test');
    return this.cartService.deleteCartItem(req.user.id, cartItemId);
  }
}
