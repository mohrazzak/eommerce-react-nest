import { Box, Grid, Typography } from '@mui/material';
import { Product } from './Order';

const OrderProduct = ({ name, quantity, price, imageURL, desc }: Product) => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: '#eee',
        borderRadius: 3,
        mb: 2,
        '&:hover img': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Box
              component={'img'}
              sx={{
                width: '100%',
                objectFit: 'contain',
                maxHeight: '100px',

                transition: '.3s',
              }}
              src={imageURL}
              alt="product image"
              loading="lazy"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Box>
              <Typography
                sx={{ fontWeight: '500', fontSize: '1.2rem', mb: 0.5 }}
              >
                {name}
              </Typography>
              <Typography variant="body1" color="grey">
                {desc}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: { xs: 2, md: 1 },
                flexWrap: 'wrap',
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  md={4}
                  sx={{
                    display: { xs: 'flex' },
                    alignItems: { xs: 'center' },
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Typography variant="body2">Price :</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={'500'}
                    sx={{ ml: { sm: 2 } }}
                  >
                    {`$${price}`}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  md={4}
                  sx={{
                    display: { xs: 'flex' },
                    alignItems: { xs: 'center' },
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Typography variant="body2">Quantity :</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ ml: { sm: 2 } }}
                  >
                    {quantity}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: { xs: 'flex' },
                    alignItems: { xs: 'center' },
                    justifyContent: { xs: 'center', md: 'flex-end' },
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Typography>Total :</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ ml: { sm: 2 } }}
                  >
                    {`$${+(quantity * price).toFixed(2)}`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderProduct;
