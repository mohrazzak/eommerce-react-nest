import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import categoryHover from '../../../assets/images/category-hover.png';
import { useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons/lib/esm';
import { CiPizza } from 'react-icons/ci';
import { BsLaptop } from 'react-icons/bs';

interface CategorySquare {
  id: string;
  Icon: IconType;
  name: string;
}

const categories: CategorySquare[] = [
  { id: 'food', Icon: CiPizza, name: 'Food' },
  { id: 'electronics', Icon: BsLaptop, name: 'Laptops' },
  { id: 'food', Icon: CiPizza, name: 'Food' },
  { id: 'electronics', Icon: BsLaptop, name: 'Laptops' },
  { id: 'food', Icon: CiPizza, name: 'Food' },
  { id: 'electronics', Icon: BsLaptop, name: 'Laptops' },
];

const CategoriesSquares = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Grid container spacing={4}>
      {categories.map((category, i) => (
        <Grid item xs={4} sm={3} md={2} lg={2} key={i}>
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: theme.palette.grey[100],
              boxShadow: 1,
              p: 1,
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexDirection: 'column',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 3,
              },
              '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                borderRadius: 2,
                left: 0,
                backgroundImage: `url(${categoryHover})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundColor: theme.palette.primary.main,
                opacity: 0,
                zIndex: 1,
                transition: '.3s',
              },
              '&:hover::Before': {
                opacity: 1,
              },
              '&:hover > *': {
                color: theme.palette.grey[100],
              },
            }}
            onClick={() => navigate(`/shop?categoryId=${category.id}`)}
          >
            <category.Icon style={{ zIndex: 2 }} size={40} />
            <Typography
              sx={{
                color: 'inherit',
                zIndex: 2,
                fontSize: '1.2rem',
                mt: { xs: 2, md: 1 },
              }}
            >
              {category.name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesSquares;
