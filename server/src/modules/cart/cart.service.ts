import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartItem } from '@prisma/client';
import { CartItemDTO } from './dto';
@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCartItemsByUserId(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({ where: { userId }, include: { Product: true } });

    return {
      data: { cartItems },
      message: 'Cart items fetched succesfully',
      statusCode: 200,
    };
  }

  async addCartItem(userId: string, dto: CartItemDTO): Promise<CartItem> {
    const existingCartItem = await this.prisma.cartItem.findFirst({ where: { productId: dto.productId, userId } });
    if (existingCartItem) {
      const a = await this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
      return a;
    }
    const cartItem = await this.prisma.cartItem.create({ data: { userId, quantity: dto.quantity, productId: dto.productId } });
    return cartItem;
  }

  async updateCartItem(userId: string, dto: CartItemDTO, cartItemId: number): Promise<CartItem> {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });

    if (!cartItem) throw new NotFoundException('Cart item not found');

    // Throw error if doesn't own it
    this.ensureUserOwnsCartItem(cartItem, userId);

    const updatedCartItem = await this.prisma.cartItem.update({ data: { ...dto }, where: { id: cartItemId } });
    return updatedCartItem;
  }

  async deleteCartItem(userId: string, cartItemId: number): Promise<CartItem> {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });

    if (!cartItem) throw new NotFoundException('Cart item not found');
    // Throw error if doesn't own it
    this.ensureUserOwnsCartItem(cartItem, userId);

    const deletedCartItem = await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    return deletedCartItem;
  }

  async updateCartItemQuantity(userId: string, cartItemId: number, quantity: number) {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!cartItem) throw new NotFoundException('Cart item not found');
    this.ensureUserOwnsCartItem(cartItem, userId);

    const updatedCartItem = await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { Product: true },
    });
    return updatedCartItem;
  }

  ensureUserOwnsCartItem(cartItem: CartItem, userId: string) {
    if (cartItem.userId !== userId) throw new BadRequestException("User doesn't own this cart item");
  }
}
