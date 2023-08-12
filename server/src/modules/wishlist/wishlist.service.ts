import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WishlistItemDTO } from './dto';
import { WishlistItem } from '@prisma/client';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async getWishlistItemsByUserId(userId: string) {
    return this.prisma.wishlistItem.findMany({ where: { userId }, include: { Product: true } });
  }

  async toggleWishlistItem(userId: string, dto: WishlistItemDTO): Promise<WishlistItem> {
    // Check if the item is already in the wishlist
    const wishlistItem = await this.prisma.wishlistItem.findFirst({ where: { productId: dto.productId, userId } });

    if (wishlistItem) {
      // If the item is already in the wishlist, delete it
      const deletedWishlistItem = await this.prisma.wishlistItem.delete({ where: { id: wishlistItem.id }, include: { Product: true } });
      return deletedWishlistItem;
    }
    // If the item is not in the wishlist, add it
    const addedWishlistItem = await this.prisma.wishlistItem.create({
      data: { productId: dto.productId, userId },
      include: { Product: true },
    });
    return addedWishlistItem;
  }
}
