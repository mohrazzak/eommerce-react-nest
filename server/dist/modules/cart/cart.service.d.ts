import { PrismaService } from '../prisma/prisma.service';
import { CartItem } from '@prisma/client';
import { CartItemDTO } from './dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCartItemsByUserId(userId: string): Promise<{
        data: {
            cartItems: (CartItem & {
                Product: import(".prisma/client").Product;
            })[];
        };
        message: string;
        statusCode: number;
    }>;
    addCartItem(userId: string, dto: CartItemDTO): Promise<CartItem>;
    updateCartItem(userId: string, dto: CartItemDTO, cartItemId: number): Promise<CartItem>;
    deleteCartItem(userId: string, cartItemId: number): Promise<CartItem>;
    updateCartItemQuantity(userId: string, cartItemId: number, quantity: number): Promise<CartItem & {
        Product: import(".prisma/client").Product;
    }>;
    ensureUserOwnsCartItem(cartItem: CartItem, userId: string): void;
}
