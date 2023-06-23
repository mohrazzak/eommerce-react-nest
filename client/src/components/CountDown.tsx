import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { BsClockHistory } from 'react-icons/bs';

const CountDown = () => {
  const theme = useTheme();

  return (
    <Box
      className="count-down"
      sx={{
        display: 'flex',
        width: '250px',
        bgcolor: theme.palette.secondary.main,
        color: '#fff',
        p: 1,
        justifyContent: 'space-between',
        borderRadius: '.5rem',
        fontSize: '.9rem',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BsClockHistory />
        <Typography>Expires in:</Typography>
      </Box>
      <Box
        component={'ul'}
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          '& > li': {
            position: 'relative',
          },
          '& > li:not(:last-child)::before': {
            content: '":"',
            position: 'absolute',
            top: 0,
            left: 22,
          },
        }}
      >
        <li>14</li>
        <li>22</li>
        <li>13</li>
        <li>04</li>
      </Box>
    </Box>
  );
};

export default CountDown;
