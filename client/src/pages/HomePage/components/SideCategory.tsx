import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface Props {
  name: string;
  Icon: IconType;
  id: string;
}

const SideCategory = ({ Icon, name, id }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        position: 'relative',
        '&:hover::before': {
          width: '6rem',
        },
        '&::before': {
          content: '""',
          width: '1.5rem',
          position: 'absolute',

          height: '2px',
          bgcolor: theme.palette.primary.dark,
          transform: 'translate(0,1rem)',
          transition: 'width .3s',
        },
      }}
    >
      <Icon size={24} />
      <Typography component={Link} to={`/shops/?categoryId=${id}`}>
        {name}
      </Typography>
    </Box>
  );
};

export default SideCategory;
