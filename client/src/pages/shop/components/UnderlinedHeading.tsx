import { Typography, useTheme } from '@mui/material';
const UnderlinedHeading = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontWeight: '500',
        position: 'relative',
        width: 'fit-content',
        '&::before': {
          content: '""',
          width: '100%',
          height: '1px',
          bgcolor: theme.palette.primary.main,
          bottom: 0,
          position: 'absolute',
        },
      }}
    >
      {title}
    </Typography>
  );
};

export default UnderlinedHeading;
