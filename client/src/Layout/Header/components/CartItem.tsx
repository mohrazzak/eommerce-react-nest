import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import MinusIcon from '../../../assets/icons/MinusIcon';
import PlusIcon from '../../../assets/icons/Register copy';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sliceProdTitle from './utils/sliceTitle';
import { CartItemProduct } from 'src/interfaces';
import {
  useDeleteCartItemMutation,
  useUpdateCartItemQuantityMutation,
} from '../../../features/api/cartItemAPI';

const CartItem = ({
  cartItem,
  setCartOpen,
}: {
  setCartOpen: (newState: boolean) => void;
  cartItem: CartItemProduct;
}) => {
  const theme: Theme = useTheme();
  const [itemCount, setItemCount] = useState<number>(cartItem.quantity);
  const [updateQuantity] = useUpdateCartItemQuantityMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  useEffect(() => {
    if (itemCount !== cartItem.quantity)
      updateQuantity({ quantity: itemCount, id: cartItem.id });
  }, [cartItem.id, cartItem.quantity, itemCount, updateQuantity]);

  const handleIncrement = () => {
    setItemCount((state) => state + 1);
  };

  const handleDecrement = () => {
    if (itemCount === 1) return;
    setItemCount((state) => state - 1);
  };

  const handleDelete = () => {
    deleteCartItem({ id: cartItem.id });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        maxWidth: '100%',
        px: 2,
        py: 1,
        '& > *.not(img)': {
          mb: 1,
          borderRadius: '10px',
          background: 'white',
        },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100px',
          height: '100px',
          mr: { xs: 0, sm: 1 },
        }}
      >
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          loading="lazy"
          alt={cartItem.Product.name}
          src={cartItem.Product.imageURL}
        />
      </Box>
      <IconButton
        sx={{
          display: { sm: 'block', md: 'none' },
          color: 'tomato',
          position: 'absolute',
          right: 10,
          top: 0,
        }}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          maxHeight: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mr: 2,
            }}
            component={Link}
            onClick={() => setCartOpen(false)}
            to={'/'}
          >
            {sliceProdTitle(cartItem.Product.name)}
          </Typography>
          <IconButton
            sx={{
              display: { xs: 'none', md: 'block' },
              color: 'tomato',
              p: 0,
            }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black',
            }}
          >
            <IconButton
              sx={{
                borderRight: '1px solid black',
                borderRadius: '0',
              }}
              onClick={handleDecrement}
            >
              <MinusIcon width="16px" height="16px" />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{itemCount}</Typography>
            <IconButton
              sx={{
                borderLeft: '1px solid black',
                borderRadius: '0',
              }}
              onClick={handleIncrement}
            >
              <PlusIcon width="16px" height="16px" />
            </IconButton>
          </Box>
          <Box sx={{ ml: 'auto', p: 2, display: 'flex' }}>
            <Typography>{itemCount}</Typography>
            <Typography sx={{ mx: 1 }}>x</Typography>
            <Typography>{cartItem.Product.price}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
