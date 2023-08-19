import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/prisma.service';
export declare class ProductController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProductById(productId: number): Promise<{
        data: {
            product: import(".prisma/client").Product & {
                Product_Images: import(".prisma/client").Product_Images[];
                Tags: import(".prisma/client").Tag[];
            };
            userWishlist: import(".prisma/client").User & {
                CartItems: import(".prisma/client").CartItem[];
                WishlistItems: import(".prisma/client").WishlistItem[];
            };
        };
        message: string;
        statusCode: HttpStatus;
    }>;
}
