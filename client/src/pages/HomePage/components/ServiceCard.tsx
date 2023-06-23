import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import { IconType } from 'react-icons/lib/esm/index';

interface Props {
  Icon: IconType;
  title: string;
  desc: string;
}

const ServiceCard = ({ Icon, desc, title }: Props) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          '& svg': { color: theme.palette.primary.main, transition: '.3s' },
          bgcolor: theme.palette.grey[100],
          p: 2,
          borderRadius: 2,
          transition: '.3s',
          '&:hover': { bgcolor: theme.palette.primary.main, color: '#fff' },
          '&:hover svg': { color: '#fff' },
        }}
      >
        <Icon size={40} />
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
          <Typography>{desc}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ServiceCard;
