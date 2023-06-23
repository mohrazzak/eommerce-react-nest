import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import rightImage from '../../../assets/images/home1.jpg';
import { useNavigate } from 'react-router-dom';

const RightImageSection = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  return (
    <Grid item md={3} sx={{ display: { xs: 'none', md: 'initial' } }}>
      <Box
        sx={{
          backgroundImage: `url(${rightImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          display: 'block',
          height: '100%',
          position: 'relative',
          objectFit: 'cover',
          width: '100%',
          p: 4,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Exclusive
            <span
              style={{
                display: 'block',
                backgroundColor: '#FFA53B',
                color: '#fff',
                padding: '.5rem',
                marginTop: '.5rem',
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: "'Rubik',sans-serif",
              }}
            >
              Collection
            </span>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/shop')}
            sx={{ mt: 2 }}
            fullWidth
          >
            {'SHOP NOW'}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default RightImageSection;
