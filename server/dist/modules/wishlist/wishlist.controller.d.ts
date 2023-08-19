import { WishlistService } from './wishlist.service';
import { IAuthRequest } from '../../shared';
import { WishlistItemDTO } from './dto';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getUserCartItems(req: IAuthRequest): Promise<{
        data: {
            wishlistItems: (import(".prisma/client").WishlistItem & {
                Product: import(".prisma/client").Product;
            })[];
        };
        message: string;
        statusCode: number;
    }>;
    toggleWishlistItem(req: IAuthRequest, cartItemDTO: WishlistItemDTO): Promise<{
        data: {
            wishlistItem: import(".prisma/client").WishlistItem;
        };
        message: string;
        statusCode: number;
    }>;
}
