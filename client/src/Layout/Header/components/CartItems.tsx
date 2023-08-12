import Box from '@mui/material/Box';
import CartItem from './CartItem';
import { useAppSelector } from '../../../features/store';
import { selectUserData } from '../../../features/api/user/userAPI';
import { CartItemProduct } from 'src/interfaces';
import { useGetCartItemsQuery } from '../../../features/api/cartItemAPI';

const CartItems = ({
  setCartOpen,
}: {
  setCartOpen: (newState: boolean) => void;
}) => {
  // const data = useAppSelector(
  //   (state) => state.cart.cartItems
  // ) as CartItemProduct[];
  const { data: data2 } = useGetCartItemsQuery();
  return (
    <Box
      sx={{
        overflowY: 'scroll',
      }}
    >
      {data2?.data.cartItems?.map((cartItem, i) => (
        <CartItem cartItem={cartItem} key={i} setCartOpen={setCartOpen} />
      ))}
    </Box>
  );
};

export default CartItems;
