import useTheme from '@mui/material/styles/useTheme';
// import { useTheme, Theme } from '@mui/material/styles/';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  const theme = useTheme();
  return (
    <Typography
      variant="h1"
      component={Link}
      to={'/'}
      sx={{
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: { xs: '0 auto', sm: '0 auto 0 0' },
        color: 'black',
      }}
    >
      <span style={{ color: theme.palette.primary.main }}>Say</span>bers
    </Typography>
  );
};

export default HeaderLogo;
