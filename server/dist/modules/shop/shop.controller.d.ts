import { HttpStatus } from '@nestjs/common';
import { ShopService } from './shop.service';
import { QueryDto } from './dto/shop.dto';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    GetFilteredProducts(filters: QueryDto): Promise<{
        data: {
            products: (import(".prisma/client").Product & {
                Category: import(".prisma/client").Category;
                Reviews: import(".prisma/client").Review[];
            })[];
            categories: import(".prisma/client").Category[];
        };
        message: string;
        status: HttpStatus;
    }>;
}
