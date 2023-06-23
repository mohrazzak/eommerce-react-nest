import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FooterContent from './FooterContent';
import SubFooter from './SubFooter';

const Footer = () => {
  const theme: Theme = useTheme();
  return (
    <Box
      component={'footer'}
      sx={{
        bgcolor: theme.palette.common.black,
        py: 4,
        px: 2,
        color: theme.palette.grey[500],
      }}
    >
      <FooterContent />
      <SubFooter />
    </Box>
  );
};

export default Footer;
