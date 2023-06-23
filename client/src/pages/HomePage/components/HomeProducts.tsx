import Grid from '@mui/material/Grid';
import HomeProductCard from './HomeProductCard';
import { Variants, motion } from 'framer-motion';
import {
  Product,
  Review,
  Category,
} from '../../../../../server/node_modules/prisma/prisma-client';
// export interface Product {
//   id: number;
//   imageURL: string;
//   name: string;
//   quantity: number;
//   price: number;
//   description: string;
//   Category: {
//     id: number;
//     name: string;
//   };
//   SKU: string;
//   averageRating: number;
//   soldToday: number;
//   Reviews: Review[];
// }

export interface ShopProduct extends Product {
  Reviews: Review[];
  Category: Category;
}

interface Props {
  products: ShopProduct[];
  smallLarge?: boolean;
  md?: number;
}
const framerMotionContainer: Variants = {
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const framerMotionItem: Variants = {
  hidden: { scale: 0, left: 100 },
  show: { scale: 1, left: 0, opacity: 1 },
};

const HomeProducts = ({ products, smallLarge, md = 4 }: Props) => {
  return (
    <Grid
      container
      spacing={3}
      component={motion.div}
      variants={framerMotionContainer}
      initial="hidden"
      animate="show"
    >
      {products.map((e, i) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={md}
          lg={3}
          xl={smallLarge ? 2 : 3}
          key={i}
          component={motion.div}
          variants={framerMotionItem}
        >
          <HomeProductCard product={e} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeProducts;
