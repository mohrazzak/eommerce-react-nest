import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Card } from '.';

const DashboardCards = ({ cards }: { cards: Card[] }) => {
  const theme = useTheme();

  return (
    <Grid container mt={2} spacing={2}>
      {cards.map((card, i) => (
        <Grid item xs={12} md={6} xl={4} key={i}>
          <Box
            sx={{
              boxShadow: 3,
              bgcolor: '#fff',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              p: 3,
              gap: 1,
              position: 'relative',
              overflow: 'hidden',
              '&:hover .shadow-icon': {
                rotate: '-10deg',
                color: `${theme.palette.grey[300]} !important`,
                transform: 'translate(-20px)',
              },
            }}
          >
            <card.Icon
              size={64}
              style={{ color: theme.palette.primary.main }}
            />
            <Box sx={{ zIndex: 2 }}>
              <Typography
                sx={{ fontSize: '1.2rem', color: theme.palette.grey[700] }}
              >
                {card.label}
              </Typography>
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '1.2rem', zIndex: 4 }}
              >
                {card.count}
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                zIndex: 1,
                right: -40,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <card.Icon
                size={100}
                style={{
                  color: theme.palette.grey[200],
                  transition: '0.3s',
                  zIndex: 1,
                }}
                className="shadow-icon"
              />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
