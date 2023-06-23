import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import HeaderData from '../data.json';

const HeaderLinksData = HeaderData.filter(
  (headerLink) => headerLink.type === 'CENTER_LINK'
);

const HeaderLinks = () => {
  return (
    <Box
      sx={{
        margin: '0 auto',
        color: '#000',
      }}
    >
      {HeaderLinksData.map((link, i) => (
        <Typography
          key={i}
          component={Link}
          to={link.url}
          sx={{ textDecoration: 'none', color: 'inherit', p: 2, mr: 1 }}
        >
          {link.label}
        </Typography>
      ))}
    </Box>
  );
};

export default HeaderLinks;
