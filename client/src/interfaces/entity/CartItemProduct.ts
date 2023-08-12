import {
  CartItem,
  Product,
} from '../../../../server/node_modules/prisma/prisma-client';

export interface CartItemProduct extends CartItem {
  Product: Product;
}
