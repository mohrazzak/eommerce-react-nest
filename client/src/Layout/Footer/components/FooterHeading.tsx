import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';

const FooterHeading = ({
  title,
  isLogo = false,
}: {
  title: string;
  isLogo?: boolean;
}) => {
  return (
    <Typography
      sx={(theme: Theme) => ({
        color: theme.palette.common.white,
        fontWeight: 'bold',
        mb: 1,
        fontSize: isLogo ? '2rem' : '1.5rem',
      })}
    >
      {title}
    </Typography>
  );
};

export default FooterHeading;
