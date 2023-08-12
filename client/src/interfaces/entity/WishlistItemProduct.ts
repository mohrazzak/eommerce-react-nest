import {
  Product,
  WishlistItem,
} from '../../../../server/node_modules/prisma/prisma-client';

export interface WishlistItemProduct extends WishlistItem {
  Product: Product;
}
