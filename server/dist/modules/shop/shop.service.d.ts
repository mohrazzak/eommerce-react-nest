import { ProductService } from './product/product.service';
import { QueryDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ShopService {
    private readonly productService;
    private readonly prisma;
    constructor(productService: ProductService, prisma: PrismaService);
    GetFilteredProducts(filters: QueryDto): Promise<(import(".prisma/client").Product & {
        Category: import(".prisma/client").Category;
        Reviews: import(".prisma/client").Review[];
    })[]>;
    getAllCategories(): Promise<import(".prisma/client").Category[]>;
}
