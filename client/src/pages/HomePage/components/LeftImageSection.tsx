import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import leftImage from '../../../assets/images/home1.jpg';
import { useNavigate } from 'react-router-dom';

const LeftImageSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={9} sx={{ height: '500px' }}>
      <Box
        sx={{
          backgroundImage: `url(${leftImage})`,
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
        <Box
          sx={{
            top: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography
              sx={{
                color: '#4a5568',
                mr: 2,
              }}
            >
              Exclusive offer
            </Typography>
            <Box
              sx={{
                background:
                  'linear-gradient(90deg, rgb(247 0 0 / 14%) 0%, rgb(255 213 213 / 27%) 79%)',
                borderRadius: '45%',
                p: 1,
                fontWeight: 'bold',
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.error.light,
                }}
              >
                20% Off
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: { xs: '1.2rem', sm: '2rem' },
              width: { xs: '100%', md: '70%' },
              mt: 2,
              color: theme.palette.primary.dark,
            }}
          >
            STAY HOME & DELIVERED YOUR{' '}
            <span
              style={{
                color: theme.palette.primary.main,
                fontWeight: '500',
                display: 'block',
              }}
            >
              DAILY NEEDS
            </span>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/shop')}
            >
              {'SHOP NOW ->'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default LeftImageSection;
