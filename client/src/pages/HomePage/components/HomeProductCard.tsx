import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { alpha } from '@mui/material/styles';
import { BsCartPlus, BsEye } from 'react-icons/bs';
import { BiHeart } from 'react-icons/bi';
import { useState } from 'react';
import ProductDialog from './ProductDialog';
import { ShopProduct } from './HomeProducts';
import prodImg from '../../../assets/images/prod.webp';
export interface Props {
  product: ShopProduct;
}

const HomeProductCard = ({ product }: Props) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          boxShadow: 1,
          // boxShadow: '-2px -1px 11px 0px #00000014',
          transition: '.3s',
          '&:hover': {
            // boxShadow: '-2px -1px 19px 1px #0000001c',
            boxShadow: 3,
          },
          '&:hover img': {
            transform: 'scale(1.05)',
          },
          bgcolor: theme.palette.grey[100],

          p: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.grey[100],
            borderRadius: 2,
            mb: 2,

            cursor: 'pointer',
          }}
        >
          <Box
            component={'img'}
            loading="lazy"
            src={product.imageURL}
            sx={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              transition: '.3s',
            }}
            onClick={() => setDialogOpen(true)}
          />
        </Box>
        <Typography>{product.name}</Typography>
        <Typography variant="body2" color="grey" my={1}>
          {`${product.quantity} In stock`}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={(theme) => ({
              color: theme.palette.primary.main,
              fontSize: '1.2rem',
            })}
          >
            {`$ ${product.price}`}
          </Typography>
        </Box>
        <Box
          sx={(theme) => ({
            mt: 2,
            color: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            '& > button': {
              transition: 'background-color .3s',
              position: 'relative',
            },
            '& > button:not(:first-of-type)::before': {
              content: '""',
              width: '1px',
              height: '100%',
              bgcolor: alpha(theme.palette.primary.main, 0.3),
              position: 'absolute',
              top: 0,
              left: -7,
            },
            '& > button:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            },
            '& > button:hover::after': {
              opacity: 1,
              transform: 'translate(-20px,45px)',
            },
            '& > button::after': {
              opacity: 0,
              borderRadius: '5px',
              height: '30px',
              backgroundColor: theme.palette.primary.main,
              position: 'absolute',
              transform: 'translate(0,45px)',
              left: '50%',
              fontSize: '1rem',
              color: '#fff',
              p: 1,
              transition: 'opacity .3s, transform .3s',
            },
          })}
        >
          <IconButton
            sx={{
              '&::after': {
                content: '"View"',
              },
            }}
            onClick={() => setDialogOpen(true)}
          >
            <BsEye />
          </IconButton>
          <IconButton
            sx={{
              '&::after': {
                content: '"Wishlist"',
              },
            }}
          >
            <BiHeart />
          </IconButton>
          <IconButton
            sx={{
              '&::after': {
                content: '"Cart"',
              },
            }}
          >
            <BsCartPlus />
          </IconButton>
        </Box>
      </Box>
      <ProductDialog
        product={product}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

export default HomeProductCard;
