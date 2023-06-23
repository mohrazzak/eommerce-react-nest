import {
  Product,
  Category,
  Review,
} from '../../../../server/node_modules/prisma/prisma-client';

export interface ShopProduct extends Product {
  Category: Category;
  Reviews: Review[];
}
