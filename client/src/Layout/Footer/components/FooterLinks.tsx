import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { FooterLink } from '../interfaces';
import Box from '@mui/material/Box';

interface Props {
  links: FooterLink[];
}

const FooterLinks: React.FC<Props> = ({ links }) => {
  return (
    <Box
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      {links.map((link, i) => (
        <Typography
          component={Link}
          to={link.path}
          key={i}
          sx={(theme: Theme) => ({
            display: 'block',
            width: '100%',
            position: 'relative',
            transition: '.5s', // add transition here

            '&:hover': {
              pl: 2,
              color: theme.palette.common.white,
              transition: '.5s',
            },
            '&:hover::before': {
              opacity: '1',
              transition: '.5s',
            },
            '&::before': {
              content: "''",
              opacity: '0',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              bgcolor: '#fff',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              position: 'absolute',
              transition: '.5s', // add transition here
            },
          })}
        >
          {link.label}
        </Typography>
      ))}
    </Box>
  );
};

export default FooterLinks;
