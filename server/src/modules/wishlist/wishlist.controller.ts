import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AuthGuard, IAuthRequest } from '../../shared';
import { WishlistItemDTO } from './dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getUserCartItems(@Req() req: IAuthRequest) {
    const wishlistItems = await this.wishlistService.getWishlistItemsByUserId(req.user.id);

    return {
      data: { wishlistItems },
      message: 'Wishlist items fetched successfully',
      statusCode: 200,
    };
  }
  @Put()
  @UseGuards(AuthGuard)
  async toggleWishlistItem(@Req() req: IAuthRequest, @Body() cartItemDTO: WishlistItemDTO) {
    const wishlistItem = await this.wishlistService.toggleWishlistItem(req.user.id, cartItemDTO);

    return {
      data: { wishlistItem },
      message: 'Wishlist item toggled successfully',
      statusCode: 200,
    };
  }
}
