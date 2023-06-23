import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Theme, useTheme } from '@mui/material/styles';
import HomeIcon from '../../assets/icons/HomeIcon';
import MailIcon from '../../assets/icons/BagIcon copy';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import Grid from '@mui/material/Unstable_Grid2';
import FooterHeading from './components/FooterHeading';
import ContactUsSection from './components/ContactUsSection';
import FooterLinks from './components/FooterLinks';
import { FooterLink } from './interfaces';

const usefulLinks: FooterLink[] = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/orders', label: 'Orders' },
  { path: '/contact-us', label: 'Contact us' },
  { path: '/about-us', label: 'About us' },
];

const categories: FooterLink[] = [
  { path: '/categories/1', label: 'Electronics' },
  { path: '/categories/1', label: 'Chairs' },
  { path: '/categories/1', label: 'PC utitls' },
  { path: '/categories/1', label: 'Food' },
];

const FooterContent = () => {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        pb: 4,
        borderBottom: `1px solid ${theme.palette.grey[900]}`,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            lineHeight: '1.8',
            color: '#bfbfbf',
          }}
          spacing={4}
        >
          <Grid xs={12} sm={6} lg={5}>
            <FooterHeading title="Saybers" isLogo={true} />
            <Typography sx={{ mb: 2 }}>
              it is a long established fact that a reader will be distracted by
              the readable content, this is a very long text tho i hope you
              like.
            </Typography>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  '& svg': { mr: 1, transition: '.3s' },
                  mb: 1,
                  '&:hover': { color: theme.palette.common.white },
                }}
              >
                <HomeIcon height="20px" width="20px" />
                <Typography
                  sx={{
                    transition: '.3s',
                    cursor: 'pointer',
                  }}
                >
                  1418 Riverwood Drive, CA 96052
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  '& svg': {
                    mr: 1,
                    transition: '.3s',
                  },
                  '&:hover': { color: theme.palette.common.white },
                }}
              >
                <MailIcon height="20px" width="20px" />
                <Typography
                  sx={{
                    '&:hover': { color: theme.palette.common.white },
                    cursor: 'pointer',
                    transition: '.3s',
                  }}
                >
                  support@fastkart.com
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} lg={2}>
            <FooterHeading title="Categories" />
            <FooterLinks links={categories} />
          </Grid>
          <Grid xs={12} sm={6} lg={2}>
            <FooterHeading title="Useful Links" />
            <FooterLinks links={usefulLinks} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <FooterHeading title="Contact Us" />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '& >div:last-child': { pt: 2 },
              }}
            >
              <ContactUsSection title="Phone number:" value="+963 9955 87028">
                <PhoneIcon />
              </ContactUsSection>
              <ContactUsSection
                title="Email Address:"
                value="mohrazzak7@gmail.com"
              >
                <MailIcon />
              </ContactUsSection>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterContent;
