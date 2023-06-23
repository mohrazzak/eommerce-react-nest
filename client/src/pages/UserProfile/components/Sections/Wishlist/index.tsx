import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { BiPlus, BiX } from 'react-icons/bi';

const Wishlist = () => {
  const theme = useTheme();

  const orders = [
    {
      name: 'Red Apples',
      categoryName: 'Fruits',
      price: 5.99,
      beforeDiscountPrice: 8.99,
      imageURL:
        'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/1.png',
    },
    {
      name: 'Organic Tomatoes',
      categoryName: 'Vegetables',
      price: 3.49,
      beforeDiscountPrice: 4.99,
      imageURL:
        'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/2.png',
    },
    {
      name: 'Grass-fed Beef',
      categoryName: 'Meat',
      price: 12.99,
      beforeDiscountPrice: 16.99,
      imageURL:
        'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/3.png',
    },
    {
      name: 'Wild-caught Salmon',
      categoryName: 'Seafood',
      price: 8.99,
      beforeDiscountPrice: 12.99,
      imageURL:
        'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/4.png',
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        {orders.map((wishlistItem, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Box
              sx={{
                bgcolor: '#fff',
                borderRadius: 3,
                boxShadow: 1,
                p: 2,
                '&:hover img': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 1,
                  position: 'relative',
                }}
              >
                <Box
                  component={'img'}
                  sx={{ maxWidth: '100%', height: '100px', transition: '.3s' }}
                  loading="lazy"
                  src={wishlistItem.imageURL}
                  alt="product"
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    boxShadow: 2,
                  }}
                  onClick={() => null}
                >
                  <BiX size={16} />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="body2" color="grey" mb={1}>
                  {wishlistItem.categoryName}
                </Typography>
                <Typography fontWeight="500" mb={1}>
                  {wishlistItem.name}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    mr={2}
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: '500',
                    }}
                  >
                    {`$${wishlistItem.price}`}
                  </Typography>
                  <Typography
                    sx={{ textDecoration: 'line-through', color: 'grey' }}
                  >
                    {`$${wishlistItem.beforeDiscountPrice}`}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  bgcolor: '#eee',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  borderRadius: 3,
                  position: 'relative',
                }}
                onClick={() => null}
              >
                <Typography>Add to cart</Typography>
                <IconButton
                  sx={{
                    bgcolor: '#fff',
                    color: theme.palette.primary.main,
                    position: 'absolute',
                    right: 4,
                    top: 4,
                  }}
                >
                  <BiPlus size={16} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
