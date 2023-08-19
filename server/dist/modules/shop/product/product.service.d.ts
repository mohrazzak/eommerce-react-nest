import { PrismaService } from '../../../modules/prisma/prisma.service';
import { QueryDto } from '../dto';
export declare class ProductService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    GetFilteredProducts(filters: QueryDto): Promise<(import(".prisma/client").Product & {
        Category: import(".prisma/client").Category;
        Reviews: import(".prisma/client").Review[];
    })[]>;
}
