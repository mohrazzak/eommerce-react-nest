import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import joinUsHome from '../../../assets/images/join-us-home.jpg';
import { useNavigate } from 'react-router-dom';

const JoinUsHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url(${joinUsHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        display: 'block',
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        height: '200px',
        borderRadius: 2,
        p: 4,
      }}
    >
      <Container maxWidth="md" sx={{ height: '100%' }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              color: theme.palette.grey[100],
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          >
            Join Us And Get...
          </Typography>
          <Typography sx={{ mt: 1, color: 'orange', fontSize: '1.2rem' }}>
            $20 discount for your first order
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            color="secondary"
            onClick={() => navigate('/signup')}
          >
            {`SIGN UP NOW`}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default JoinUsHome;
