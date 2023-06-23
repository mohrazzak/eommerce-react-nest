import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import home3 from '../../../assets/images/home3.jpg';

const NewArrival = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.grey[100],
        borderRadius: 2,
        p: 4,
        backgroundImage: `url(${home3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        display: 'block',
        position: 'relative',
        objectFit: 'cover',
        width: '100%',
        height: { lg: '650px', xl: '720px' },
      }}
    >
      <Typography
        sx={{
          color: 'orange',
          fontFamily: 'cursive',
          fontSize: '2rem',
        }}
      >
        New Arrival
      </Typography>
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontWeight: '500',
          my: 1,
          fontSize: '2rem',
        }}
      >
        DESK TABLE
      </Typography>
      <Typography color="grey">Top Selling Of The Week!</Typography>
      <Typography color="grey">Exclusive Offer!</Typography>
      <Button
        variant="outlined"
        sx={{ mt: 1 }}
        onClick={() => navigate('/shop')}
      >
        SHOP NOW
      </Button>
    </Box>
  );
};

export default NewArrival;
