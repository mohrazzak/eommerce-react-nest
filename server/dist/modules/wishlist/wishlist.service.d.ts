import { PrismaService } from '../prisma/prisma.service';
import { WishlistItemDTO } from './dto';
import { WishlistItem } from '@prisma/client';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWishlistItemsByUserId(userId: string): Promise<(WishlistItem & {
        Product: import(".prisma/client").Product;
    })[]>;
    toggleWishlistItem(userId: string, dto: WishlistItemDTO): Promise<WishlistItem>;
}
