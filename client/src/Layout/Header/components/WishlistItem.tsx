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
import { WishlistItemProduct } from 'src/interfaces';

import { useToggleWishlistItemMutation } from '../../../features/api/wishlistAPI';

const WishlistItem = ({
  wishlistItem,
  setWishlistOpen,
}: {
  setWishlistOpen: (newState: boolean) => void;
  wishlistItem: WishlistItemProduct;
}) => {
  const theme: Theme = useTheme();
  const [toggleWishlistItem] = useToggleWishlistItemMutation();
  const handleDelete = () => {
    toggleWishlistItem({ productId: wishlistItem.productId });
  };
  console.log(wishlistItem);

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
          alt={wishlistItem.Product.name}
          src={wishlistItem.Product.imageURL}
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
            onClick={() => setWishlistOpen(false)}
            to={'/'}
          >
            {sliceProdTitle(wishlistItem.Product.name)}
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
          <Box sx={{ ml: 'auto', p: 2, display: 'flex' }}>
            <Typography>1</Typography>
            <Typography sx={{ mx: 1 }}>x</Typography>
            <Typography>{wishlistItem.Product.price}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WishlistItem;
