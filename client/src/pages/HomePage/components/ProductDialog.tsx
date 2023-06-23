import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { alpha } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { BiX } from 'react-icons/bi';
import { Props as ProductProps } from './HomeProductCard';
import RenderStars from '../../../utils/RenderStars';
import { ShopProduct } from '../../../interfaces';

interface Props extends ProductProps {
  setDialogOpen: (newState: boolean) => void;
  dialogOpen: boolean;
  product: ShopProduct;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} timeout={400} />;
});

const ProductDialog = ({ setDialogOpen, dialogOpen, product }: Props) => {
  const theme = useTheme();

  return (
    <Dialog
      TransitionComponent={Transition}
      open={dialogOpen}
      keepMounted
      maxWidth="lg"
      onClose={() => setDialogOpen(false)}
      scroll="body"
    >
      <Box sx={{ p: 3, position: 'relative' }}>
        <IconButton
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,
            color: '#fff',
            bgcolor: theme.palette.primary.main,
            transition: 'background-color .3s',
            p: 0,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.9),
            },
          }}
          onClick={() => setDialogOpen(false)}
        >
          <BiX size={24} />
        </IconButton>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              bgcolor: theme.palette.grey[50],
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component={'img'}
              loading="lazy"
              src={product.imageURL}
              sx={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                maxHeight: {
                  xs: '400px',
                  lg: '100%',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                '&': { position: 'relative' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  bgcolor: '#eee',
                },
                mb: 2,
              }}
            >
              <Typography sx={{ fontWeight: '500', fontSize: '1.5rem' }}>
                {product.name}
              </Typography>
              <Typography color="grey" fontSize="1.2rem" my={1}>
                {`$ ${product.price}`}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: { xs: 2 },
                  alignItems: 'center',
                }}
              >
                <Box sx={{ color: 'orange', display: 'flex' }}>
                  {RenderStars(product.averageRating)}
                </Box>
                <Typography color="grey" fontSize=".9rem">
                  {`${product.Reviews.length} Reviews`}
                </Typography>
                <Typography
                  color="secondary"
                  fontSize=".9rem"
                  sx={{ mt: { xs: 1, sm: 0 } }}
                >
                  {`${0} Sold in last 24 hours`}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight="500" sx={{ mb: 1 }}>
                Product Details :
              </Typography>
              <Typography variant="body1" color="grey">
                {product.description}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                '& p': { fontSize: '.9rem' },
                '&': { position: 'relative' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  bgcolor: '#eee',
                },
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography sx={{ width: '160px' }}>
                  Product category:
                </Typography>
                <Typography>{product.Category.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography sx={{ width: '160px' }}>
                  Product unique code:
                </Typography>
                <Typography>{product.SKU}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ width: '160px' }}>
                  Product in Stock:
                </Typography>
                <Typography>{product.quantity}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 3,
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: alpha('#000', 0.8),
                  '&:hover': {
                    bgcolor: alpha('#000', 0.9),
                  },
                }}
              >
                Add to cart
              </Button>
              <Button variant="contained">View details</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default ProductDialog;
