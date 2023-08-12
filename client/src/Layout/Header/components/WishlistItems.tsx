import Box from '@mui/material/Box';
import CartItem from './CartItem';
import { useAppSelector } from '../../../features/store';
import { selectUserData } from '../../../features/api/user/userAPI';
import { CartItemProduct } from '../../../interfaces';
import { useGetCartItemsQuery } from '../../../features/api/cartItemAPI';
import { useGetWishlistItemsQuery } from '../../../features/api/wishlistAPI';
import WishlistItem from './WishlistItem';

const WishlistItems = ({
  setWishlistOpen,
}: {
  setWishlistOpen: (newState: boolean) => void;
}) => {
  // const data = useAppSelector(
  //   (state) => state.cart.cartItems
  // ) as CartItemProduct[];
  const { data: data2 } = useGetWishlistItemsQuery();
  return (
    <Box
      sx={{
        overflowY: 'scroll',
      }}
    >
      {data2?.data.wishlistItems?.map((wishlistItem, i) => (
        <WishlistItem
          wishlistItem={wishlistItem}
          key={i}
          setWishlistOpen={setWishlistOpen}
        />
      ))}
    </Box>
  );
};

export default WishlistItems;
