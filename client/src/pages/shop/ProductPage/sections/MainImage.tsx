import { Box } from '@mui/material';

interface Props {
  image: string;
}

const MainImage = ({ image }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: '#eee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{ maxWidth: '100%', height: 'auto' }}
        loading="lazy"
      />
    </Box>
  );
};

export default MainImage;
