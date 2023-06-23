import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import HomeProducts, { ShopProduct } from '../HomePage/components/HomeProducts';

enum OrderBy {
  NONE = '',
  POPULARITY = 'Popularity',
  LOW_HIGH_PRICE = 'Low - High Price',
  HIGH_LOW_PRICE = 'High - Low Price',
  AVERAGE_RATING = 'Average Rating',
  A_Z_ORDER = 'A-Z Order',
  Z_A_ORDER = 'Z-A Order',
}

interface Props {
  products: ShopProduct[];
}

const Products = ({ products }: Props) => {
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.NONE);

  const sortProducts = useCallback(
    (products: ShopProduct[], order: OrderBy) => {
      const sortedProducts = [...products];

      switch (order) {
        case OrderBy.HIGH_LOW_PRICE:
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case OrderBy.LOW_HIGH_PRICE:
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case OrderBy.AVERAGE_RATING:
          sortedProducts.sort((a, b) => a.averageRating - b.averageRating);
          break;
        case OrderBy.A_Z_ORDER:
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case OrderBy.Z_A_ORDER:
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }

      return sortedProducts;
    },
    []
  );

  const sortedProducts = useMemo(() => {
    if (products) return sortProducts(products, orderBy);
    return [];
  }, [products, sortProducts, orderBy]);

  const handleOrderChange = (e: SelectChangeEvent<OrderBy>) => {
    const selectedOrder = e.target.value as OrderBy;
    setOrderBy(selectedOrder);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
          <InputLabel id="demo-select-small-label">Order By</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Order By"
            value={orderBy}
            onChange={handleOrderChange}
          >
            <MenuItem value={OrderBy.NONE}>None</MenuItem>
            {Object.values(OrderBy).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <HomeProducts products={sortedProducts} md={6} />
    </Box>
  );
};

export default Products;
