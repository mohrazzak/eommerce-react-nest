import {
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import ProductCountDown from 'src/components/ProductCountDown';
import { parse, addDays, addYears, format } from 'date-fns';
import { BiHeart, BiMinus, BiPlus } from 'react-icons/bi';
import { FaStripe } from 'react-icons/fa';
import { BsPaypal } from 'react-icons/bs';
import { RiVisaLine } from 'react-icons/ri';
import { useState } from 'react';
const Section = () => {
  const [cartCount, setCartCount] = useState(0);
  const theme = useTheme();
  const date = new Date();
  const tmr = addYears(date, 1);

  const decreaseCartCount = () => {
    if (cartCount == 0) return;
    setCartCount((state) => --state);
  };
  return (
    <Box>
      <Box>
        <Typography
          sx={{
            bgcolor: alpha(theme.palette.secondary.light, 0.2),
            width: 'fit-content',
            p: 1,
            color: theme.palette.secondary.main,
            fontSize: '.8rem',
            borderRadius: 2,
            mb: 2,
          }}
        >
          30% OFF
        </Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Creamy Chocolate Cake
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: '1.5rem',
                fontWeight: '500',
              }}
            >
              $49.50
            </Typography>
            <Typography
              sx={{
                color: theme.palette.grey[600],
                textDecoration: 'line-through',
              }}
            >
              $58.46
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating name="rating" value={3.5} readOnly size="small" />
            <Typography sx={{ color: theme.palette.grey[600] }}>
              41 Customer Review
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{ mt: 2, color: theme.palette.grey[600] }}
        >
          Lollipop cake chocolate chocolate cake dessert jujubes. Shortbread
          sugar plum dessert powder cookie sweet brownie. Cake cookie apple pie
          dessert sugar plum muffin cheesecake.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography sx={{ fontWeight: '500', mb: 1 }}>
            Hurry up! Sales Ends In
          </Typography>
          <ProductCountDown expirationDate={tmr} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: theme.palette.grey[100],
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              mr: 2,
            }}
          >
            <IconButton
              sx={{
                bgcolor: '#fff',
                borderRadius: '0',
              }}
              size="small"
              onClick={() => setCartCount((state) => ++state)}
            >
              <BiPlus />
            </IconButton>
            <Box mx={4}>{cartCount}</Box>
            <IconButton
              sx={{ bgcolor: '#fff', borderRadius: '0' }}
              size="small"
              onClick={decreaseCartCount}
            >
              <BiMinus />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: 'center',
              alignSelf: 'center',
              height: '100%',
            }}
          >
            <Button
              sx={{
                bgcolor: alpha('#000', 0.8),
                '&:hover': { bgcolor: alpha('#000', 0.75) },
              }}
              fullWidth
              variant="contained"
            >
              Add to cart
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            color: theme.palette.grey[600],
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => null}
        >
          <Box mr={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <BiHeart />
          </Box>
          <Typography>Add to Wishlist</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography mb={2}>Product Information:</Typography>
          <Box sx={{ bgcolor: theme.palette.grey[100], p: 2 }}>
            <Box
              sx={{ display: 'flex', gap: '1rem', mb: 1, alignItems: 'center' }}
            >
              <Typography>Added at:</Typography>
              <Typography>{format(new Date(), 'yyyy/mm/dd')}</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', gap: '1rem', mb: 1, alignItems: 'center' }}
            >
              <Typography>Stock:</Typography>
              <Typography>54</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Typography>Tags:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ bgcolor: '#fff', p: 0.5, borderRadius: 2 }}>
                  Games
                </Typography>
                <Typography sx={{ bgcolor: '#fff', p: 0.5, borderRadius: 2 }}>
                  CSGO
                </Typography>
                <Typography sx={{ bgcolor: '#fff', p: 0.5, borderRadius: 2 }}>
                  Game
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography mb={2}>Guaranteed Safe Checkout</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              color: theme.palette.primary.dark,
            }}
          >
            <Box
              bgcolor="#eee"
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1,
                justifyContent: 'center',
              }}
              width="60px"
              height="40px"
            >
              <RiVisaLine style={{ height: '40px', width: '40px' }} />
            </Box>
            <Box
              bgcolor="#eee"
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                justifyContent: 'center',
              }}
              width="60px"
              height="40px"
            >
              <BsPaypal style={{ height: '40px', width: '40px' }} />
            </Box>
            <Box
              bgcolor="#eee"
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                justifyContent: 'center',
              }}
              width="60px"
              height="40px"
            >
              <FaStripe style={{ height: '40px', width: '40px' }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Section;
