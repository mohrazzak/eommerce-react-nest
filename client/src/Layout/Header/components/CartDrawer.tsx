import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CloseIcon from '../../../assets/icons/CloseIcon';
import CartItems from './CartItems';

const CartDrawer = ({
  cartOpen,
  setCartOpen,
}: {
  cartOpen: boolean;
  setCartOpen: (newState: boolean) => void;
}) => {
  const theme: Theme = useTheme();

  return (
    <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
      <Box
        // width={matchUpXs ? '200px' : '100px'}
        sx={{
          width: { xs: '75vw', md: '600px' },
          height: '100%',
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1,
            boxShadow: '-4px 8px 9px 3px #d7d7d757',
            bgcolor: '#eee',
            fontWeight: 'bold',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                fontSize: '1.5rem',
              }}
            >
              Cart
            </Typography>
          </Box>
          <IconButton
            onClick={() => setCartOpen(false)}
            sx={{
              color: 'tomato',
            }}
          >
            <CloseIcon height="30px" width="30px" />
          </IconButton>
        </Box>

        <Box
          sx={{
            '& > *': {
              borderBottom: '1px solid #e9e9e9',
              bgcolor: '#fbfbfb',
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 'calc(100% - 62px)',
            p: 1,
          }}
        >
          <CartItems setCartOpen={setCartOpen} />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                '& > *': { fontSize: '1.2rem' },
              }}
            >
              <Typography>Total: </Typography>
              <Typography>$1999.24</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                '& > *': { width: '400px' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button variant="contained" color={'primary'} sx={{ mr: 2 }}>
                Check out
              </Button>
              <Button variant="contained" color={'secondary'}>
                View cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
