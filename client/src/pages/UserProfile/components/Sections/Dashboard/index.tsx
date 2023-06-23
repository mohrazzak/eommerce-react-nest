import { Box, Grid, Typography, useTheme } from '@mui/material';
import { AiOutlineInbox } from 'react-icons/ai';
import { MdOutlineMoveToInbox } from 'react-icons/md';
import { IconType } from 'react-icons';
import { BsBagHeart } from 'react-icons/bs';
import DashboardCards from './DashboardCards';

export interface Card {
  label: string;
  count: number;
  Icon: IconType;
}

const cards: Card[] = [
  { count: 310, Icon: AiOutlineInbox, label: 'Orders' },
  { count: 254, Icon: MdOutlineMoveToInbox, label: 'Pending Orders' },
  { count: 12, Icon: BsBagHeart, label: 'Total Wishlist' },
];

const Dashboard = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography sx={{ mb: 1 }} color={theme.palette.grey[700]}>
        {'Hello, '}
        <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Vicki E.
        </span>
      </Typography>
      <Typography color={theme.palette.grey[700]}>
        Pope From your My Account Dashboard you have the ability to view a
        snapshot of your recent account activity and update your account
        information. Select a link below to view or edit information.
      </Typography>
      <DashboardCards cards={cards} />
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '1.2rem',
            pb: 1,
            position: 'relative',
            '&::before': {
              position: 'absolute',
              content: "''",
              width: '200px',
              bottom: 0,
              left: 0,
              height: '1px',
              bgcolor: theme.palette.grey[400],
            },
          }}
        >
          Account Information
        </Typography>
        <Grid container mt={0} spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography
              mb={2}
              color={theme.palette.primary.main}
              fontWeight="500"
            >
              Contact Information:
            </Typography>
            <Typography color="grey" mb={1}>
              Sarah Ahmad
            </Typography>
            <Typography color="grey">vicki.pope@gmail.com</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              mb={2}
              color={theme.palette.primary.main}
              fontWeight="500"
            >
              Address Book:
            </Typography>
            <Typography color="grey" mb={1}>
              Default Billing Address
            </Typography>
            <Typography color={theme.palette.secondary.main}>
              You have not set a default billing address.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
