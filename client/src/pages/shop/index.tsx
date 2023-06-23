import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import ImgSlider from './components/ImgSlider';
import Sidebar from './Sidebar';
import { FiFilter } from 'react-icons/fi';
import { useState } from 'react';
import Products from './Products';
import { useGetShopQuery } from '../../features/api/user/shopAPI';
import { useEffect } from 'react';
export interface Filter {
  key: string;
  value: string | number[] | number | null;
}

const MAX_PRICE = 2000;

const ShopPage = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [fetchFilters, setFetchFilters] = useState<Filter[]>([
    { key: 'price', value: [0, 2000] },
  ]);
  const { data, isSuccess } = useGetShopQuery(fetchFilters);

  useEffect(() => {
    if (isSuccess) console.log('fetched');
  }, [isSuccess]);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Box>
          <ImgSlider />
          <Grid container spacing={3}>
            <Grid
              item
              xs={0}
              sx={{ display: { xs: 'none', md: 'block' } }}
              md={4}
              lg={3}
            >
              <Box sx={{ p: { xs: 2, md: 0 } }}>
                <Sidebar
                  drawerOpen={drawerOpen}
                  handleCloseDrawer={handleCloseDrawer}
                  MAX_PRICE={MAX_PRICE}
                  setFetchFilters={setFetchFilters}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <IconButton
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: '#fff',
                  borderRadius: 2,
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                  mb: 2,
                  display: { xs: 'flex', md: 'none' },
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <FiFilter />
                <Typography ml={1}>Filters</Typography>
              </IconButton>
              <Box>
                <Products products={data?.data.products || []} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ShopPage;
