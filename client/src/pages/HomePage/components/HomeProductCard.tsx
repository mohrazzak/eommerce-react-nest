import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { alpha } from '@mui/material/styles';
import {
  BsBagHeart,
  BsCartPlus,
  BsCartPlusFill,
  BsEye,
  BsFillBagHeartFill,
} from 'react-icons/bs';
import { BiHeart } from 'react-icons/bi';
import { useState } from 'react';
import ProductDialog from './ProductDialog';
import { ShopProduct } from './HomeProducts';
import prodImg from '../../../assets/images/prod.webp';
import {
  selectCartItemsData,
  useAddCartItemMutation,
} from '../../../features/api/cartItemAPI';
import { Badge, Checkbox } from '@mui/material';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAppSelector } from '../../../features/store';
import {
  selectWishlistItemData,
  useToggleWishlistItemMutation,
} from '../../../features/api/wishlistAPI';
export interface Props {
  product: ShopProduct;
}

const HomeProductCard = ({ product }: Props) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [addToCart] = useAddCartItemMutation();
  const [toggleWishlist] = useToggleWishlistItemMutation();

  const cartItems = useAppSelector((state) => selectCartItemsData(state));

  const cartItem = cartItems?.find((cI) => cI.productId === product.id);
  const isAddedToCart = Boolean(cartItem);

  const wishlistItems = useAppSelector((state) =>
    selectWishlistItemData(state)
  );

  const wishlistItem = wishlistItems?.find((cI) => cI.productId === product.id);
  const isWishlisted = Boolean(wishlistItem);
  const handleAddToCart = () => {
    // if (isAddedToCart) return  ;
    addToCart({ quantity: 1, productId: product.id });
  };
  const handleToggleWishlist = () => {
    toggleWishlist({ productId: product.id });
  };

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
          })}
        >
          <Box>
            <IconButton onClick={() => setDialogOpen(true)}>
              <BsEye />
            </IconButton>
          </Box>
          <Box>
            <Checkbox
              icon={<BsBagHeart size={24} />}
              checkedIcon={
                <BsFillBagHeartFill
                  color={theme.palette.secondary.dark}
                  size={24}
                />
              }
              onClick={handleToggleWishlist}
              checked={isWishlisted}
            />
          </Box>

          <Box>
            <Badge
              badgeContent={cartItem?.quantity}
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 13,
                  border: `2px solid ${theme.palette.background.paper}`,
                  padding: '0 4px',
                },
              }}
            >
              <Checkbox
                icon={<BsCartPlus size={24} />}
                checkedIcon={<BsCartPlusFill size={24} />}
                checked={isAddedToCart || false}
                onClick={handleAddToCart}
              />
            </Badge>
          </Box>
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
