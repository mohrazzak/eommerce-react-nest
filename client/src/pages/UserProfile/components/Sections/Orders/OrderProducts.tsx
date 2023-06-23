import { Box } from '@mui/material';
import OrderProduct from './OrderProduct';
import { Product } from './Order';

const OrderProducts = ({ products }: { products: Product[] }) => {
  return (
    <Box>
      {products.map((orderProduct, i) => (
        <OrderProduct
          key={i}
          desc={orderProduct.desc}
          imageURL={orderProduct.imageURL}
          name={orderProduct.name}
          price={orderProduct.price}
          quantity={orderProduct.quantity}
        />
      ))}
    </Box>
  );
};

export default OrderProducts;
