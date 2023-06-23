import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Error404Image from '../../assets/images/Error404.png';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
          p: 6,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            loading="lazy"
            alt={'404 error'}
            src={Error404Image}
          />
        </Box>
        <Box
          sx={{
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>
            The page you are looking for could not be found. The link to this
            address may be outdated or we may have moved the since you last
            bookmarked it.
          </Typography>
          <Button
            variant="contained"
            sx={{ textAlign: 'center', width: 'fit-content', mx: 'auto' }}
            onClick={() => navigate('/')}
          >
            Back To Home Screen
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Error404;
