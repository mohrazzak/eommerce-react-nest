import { Box, Divider, useTheme } from '@mui/material';
import { useState, useEffect, useRef, useMemo } from 'react';
import { differenceInSeconds } from 'date-fns';

interface Props {
  expirationDate: Date;
}
const ONE_DAY = 60 * 60 * 24;
const ONE_HOUR = 60 * 60;
const ONE_MINUTE = 60;
const ProductCountDown = ({ expirationDate }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const diffInSeconds = differenceInSeconds(expirationDate, currentTime);

  const getCoundown = () => {
    if (diffInSeconds <= 1) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    const days = Math.floor(diffInSeconds / ONE_DAY);
    const hours = Math.floor((diffInSeconds - days * ONE_DAY) / ONE_HOUR);
    const minutes = Math.floor(
      (diffInSeconds - days * ONE_DAY - hours * ONE_HOUR) / ONE_MINUTE
    );
    const seconds =
      diffInSeconds - days * ONE_DAY - hours * ONE_HOUR - minutes * ONE_MINUTE;
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const countdown = useMemo(getCoundown, [diffInSeconds]);

  useEffect(() => {
    setInterval(() => {
      const now = new Date().getTime();
      setCurrentTime(now);
    }, 1000);
  }, []);

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: theme.palette.grey[100],
        width: 'fit-content',
        px: 2,
      }}
    >
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Box>{countdown.days}</Box>
        <Box>Days</Box>
      </Box>
      <Divider orientation="vertical" flexItem>
        :
      </Divider>
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Box>{countdown.hours}</Box>
        <Box>Hours</Box>
      </Box>
      <Divider orientation="vertical" flexItem>
        :
      </Divider>
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Box>{countdown.minutes}</Box>
        <Box>Min</Box>
      </Box>
      <Divider orientation="vertical" flexItem>
        :
      </Divider>
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Box>{countdown.seconds}</Box>
        <Box>Sec</Box>
      </Box>
    </Box>
  );
};

export default ProductCountDown;
