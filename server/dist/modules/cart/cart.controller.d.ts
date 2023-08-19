import { CartService } from './cart.service';
import { IAuthRequest } from '../../shared';
import { CartItemDTO, CartItemUpdateQuantity } from './dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getUserCartItems(req: IAuthRequest): Promise<{
        data: {
            cartItems: (import(".prisma/client").CartItem & {
                Product: import(".prisma/client").Product;
            })[];
        };
        message: string;
        statusCode: number;
    }>;
    addCartItem(req: IAuthRequest, cartItemDTO: CartItemDTO): Promise<import(".prisma/client").CartItem>;
    updateCartItem(req: IAuthRequest, cartItemDTO: CartItemDTO, cartItemId: number): Promise<import(".prisma/client").CartItem>;
    updateCartItemQuantity(req: IAuthRequest, cartItemDTO: CartItemUpdateQuantity, cartItemId: number): Promise<{
        data: {
            cartItem: import(".prisma/client").CartItem & {
                Product: import(".prisma/client").Product;
            };
        };
        message: string;
        statusCode: number;
    }>;
    deleteCartItem(req: IAuthRequest, cartItemId: number): Promise<import(".prisma/client").CartItem>;
}
