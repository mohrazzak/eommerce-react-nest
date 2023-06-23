import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import React from 'react';
import Grid from '@mui/material/Grid';
import LeftImageSection from './components/LeftImageSection';
import RightImageSection from './components/RightImageSection';
import HomeHeading from './components/HomeHeading';
import macBook from '../../assets/images/macbook.png';
import CountDown from '../../components/CountDown';
import SideCategories from './components/SideCategories';
import NewArrival from './components/NewArrival';
import HomeProducts from './components/HomeProducts';
import ServicesCards from './components/ServicesCards';
import CategoriesSquares from './components/CategoriesSquares';
import homeLandscape from '../../assets/images/home-landscape.jpg';
import halfHomeSection1 from '../../assets/images/half-home-section-1.jpg';
import halfHomeSection2 from '../../assets/images/half-home-section-2.jpg';
import JoinUsHome from './components/JoinUsHome';
import { useAppSelector } from '../../features/store';
import { ShopProduct } from 'src/interfaces';

const products: ShopProduct[] = [
  {
    id: 1,
    imageURL: macBook,
    name: 'Mac book 2021',
    quantity: 22,
    price: 104.53,
    description:
      'Candy canes sugar plum tart cotton candy chupa chups sugar plum chocolate I love. Caramels marshmallow icing dessert candy canes I love soufflé I love toffee. Marshmallow pie sweet sweet roll sesame snaps tiramisu jelly bear claw. Bonbon muffin I love carrot cake sugar plum dessert bonbon.',
    categoryId: 1,
    SKU: 'W0690034',
    averageRating: 4.5,
    Category: { id: 1, name: 'test', copounId: null },
    Reviews: [],
    couponId: null,
  },
  {
    id: 2,
    imageURL: macBook,
    name: 'I phone14 pro max',
    quantity: 22,
    price: 15.53,
    description:
      'Candy canes sugar plum tart cotton candy chupa chups sugar plum chocolate I love. Caramels marshmallow icing dessert candy canes I love soufflé I love toffee. Marshmallow pie sweet sweet roll sesame snaps tiramisu jelly bear claw. Bonbon muffin I love carrot cake sugar plum dessert bonbon.',
    categoryId: 1,
    SKU: 'W0690034',
    averageRating: 4.5,
    Category: { id: 1, name: 'test', copounId: null },
    Reviews: [],
    couponId: null,
  },
];

const Home: React.FC = () => {
  const theme = useTheme();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <Box>
      <Box sx={{ pt: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <LeftImageSection />
            <RightImageSection />
          </Grid>
        </Container>
      </Box>

      <Box sx={{ pt: 4 }}>
        <Container maxWidth="xl">
          <ServicesCards />
        </Container>
      </Box>

      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xl={9} lg={9}>
              <Box mb={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    '& .count-down': {
                      mt: { xs: 2, md: 0 },
                    },
                    mb: 4,
                  }}
                >
                  <HomeHeading
                    desc="Don't miss this opportunity at a special discount just for this week."
                    title={'Top Save Today'}
                  />
                  <CountDown />
                </Box>
                <HomeProducts products={products} smallLarge={false} />
              </Box>

              <Box mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        backgroundImage: `url(${halfHomeSection1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        display: 'block',
                        width: '100%',
                        position: 'relative',
                        objectFit: 'cover',
                        aspectRatio: '3/1',
                        p: 4,
                        transition: '.3s',
                        boxShadow: 1,
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.9, boxShadow: 3 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'cursive',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: 'orange',
                          mb: 2,
                        }}
                      >
                        50% offer
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: '1.5rem',
                        }}
                      >
                        <span
                          style={{
                            color: theme.palette.primary.dark,
                            fontWeight: 'bold',
                          }}
                        >
                          Restyling
                        </span>{' '}
                        your Home
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        backgroundImage: `url(${halfHomeSection2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        display: 'block',
                        width: '100%',
                        position: 'relative',
                        objectFit: 'cover',
                        aspectRatio: '3/1',
                        transition: '.3s',
                        p: 4,
                        boxShadow: 1,
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.9, boxShadow: 3 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'cursive',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: 'orange',
                          mb: 2,
                        }}
                      >
                        50% offer
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: '1.5rem',
                        }}
                      >
                        <span
                          style={{
                            color: theme.palette.primary.dark,
                            fontWeight: 'bold',
                          }}
                        >
                          New Elite
                        </span>{' '}
                        Collections
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box mb={3}>
                <Box mb={4}>
                  <HomeHeading
                    title="Bowse By Categories"
                    desc="Top Categories Of The Week"
                  />
                </Box>
                <CategoriesSquares />
              </Box>
            </Grid>

            <Grid
              item
              xs={0}
              sx={{
                display: { xs: 'none', lg: 'block' },
                height: '100%',
              }}
              xl={3}
              lg={3}
            >
              <Box mb={5}>
                <SideCategories />
              </Box>
              <Box mb={5}>
                <NewArrival />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundImage: `url(${homeLandscape})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  display: 'block',
                  width: '100%',
                  position: 'relative',
                  objectFit: 'cover',
                  minHeight: '300px',
                  borderRadius: 2,
                  p: 4,
                }}
              >
                <Box>
                  <Container maxWidth="md">
                    <Typography
                      sx={{
                        fontFamily: 'cursive',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'orange',
                        mb: 2,
                      }}
                    >
                      BEST OF COLLECTIONS
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '2.5rem',
                        fontWeight: '500',
                        color: theme.palette.primary.dark,
                      }}
                    >
                      Home Decor
                      <span style={{ color: theme.palette.primary.main }}>
                        {` LookBook `}
                      </span>
                      2022
                    </Typography>
                    <Typography variant="body2" maxWidth="50%" color="grey">
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate.
                    </Typography>
                    <Button sx={{ mt: 3 }} variant="contained">
                      Shop now
                    </Button>
                  </Container>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  mb: 3,
                }}
              >
                <HomeHeading
                  desc="A virtual assistant collects the products from your list."
                  title={'Our best seller'}
                />
              </Box>
              <HomeProducts products={products} smallLarge={true} />
            </Grid>
            {!isAuth && (
              <Grid item xs={12}>
                <JoinUsHome />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
