import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import SideCategory from './SideCategory';
import { BiLaptop } from 'react-icons/bi';
import { CiPizza } from 'react-icons/ci';
import { TbArmchair } from 'react-icons/tb';

const categories = [
  { name: 'Electronics', Icon: BiLaptop, id: '3' },
  { name: 'Food', Icon: CiPizza, id: '5' },
  { name: 'Furniture', Icon: TbArmchair, id: '6' },
  { name: 'Electronics', Icon: BiLaptop, id: '3' },
  { name: 'Food', Icon: CiPizza, id: '5' },
  { name: 'Furniture', Icon: TbArmchair, id: '6' },
  { name: 'Electronics', Icon: BiLaptop, id: '3' },
  { name: 'Food', Icon: CiPizza, id: '5' },
  { name: 'Furniture', Icon: TbArmchair, id: '6' },
  { name: 'Electronics', Icon: BiLaptop, id: '3' },
];
const SideCategories = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.grey[100],
        borderRadius: 2,
        p: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: '1.2rem',
          fontWeight: '500',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: -3,
            left: 0,
            width: '40%',
            height: '2px',
            bgcolor: theme.palette.primary.main,
          },
        }}
      >
        Shop By Category:
      </Typography>
      <Box sx={{ mt: 4 }}>
        {categories.map((category, i) => (
          <SideCategory
            key={i}
            Icon={category.Icon}
            name={category.name}
            id={category.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SideCategories;
