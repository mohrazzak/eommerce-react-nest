import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BiLeaf } from 'react-icons/bi';

interface Props {
  title: string;
  desc: string;
}

const HomeHeading = ({ title, desc }: Props) => {
  return (
    <Box>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box
        sx={(theme) => ({
          mt: 1,
          width: '140px',
          textAlign: 'center',
          '& svg': { color: theme.palette.primary.main, bgcolor: '#fff' },
          position: 'relative',
          '&::before': {
            content: "''",
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            height: '1px',
            left: '0',
            bgcolor: theme.palette.primary.main,
            zIndex: -1,
          },
        })}
      >
        <BiLeaf size={30} />
      </Box>
      <Typography variant="body2" color={'grey'} mt={1}>
        {desc}
      </Typography>
    </Box>
  );
};

export default HomeHeading;
