import { Box, Typography, alpha, useTheme } from '@mui/material';

interface Props {
  handleChange: (fieldName: string, theFile: File | undefined) => void;
  id: string;
  name: string;
  image: File | undefined;
  setImage: (state: File | undefined) => void;
}

const InputImage = ({ handleChange, id, name, image, setImage }: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column-reverse',
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        p: 2,
        borderRadius: 1,
        border: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          borderRadius: 2,
          overflow: 'hidden',
          mt: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {image ? (
          <Box
            component={'img'}
            sx={{
              maxHeight: '100%',
              width: '100%',
              borderRadius: 1,
              objectFit: 'cover',
            }}
            src={URL.createObjectURL(image)}
            loading="lazy"
            alt="avatar"
          />
        ) : (
          <Typography>No image provided</Typography>
        )}
      </Box>
      <Box
        component={'label'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          px: 4,
          border: '1px solid grey',
          borderRadius: 1,
          boxShadow: 1,
          color: 'grey',
          bgcolor: '#fff',
          transition: '.3s',
          '&:hover': {
            bgcolor: '#fffa',
          },
        }}
        htmlFor="image"
      >
        <span style={{ marginBottom: '0.5rem' }}>
          {image ? 'Image uploaded' : 'Upload a file'}
        </span>
        <Box
          component={'input'}
          type="file"
          id={id}
          name={name}
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            setImage(e.target.files?.[0]);
            handleChange('imageURL', e.target.files?.[0]);
          }}
          sx={{
            ml: image ? '' : '3rem',
            '&::file-selector-button': {
              padding: '.2rem .8rem',
              bgcolor: '#eee',
              transition: '.3s',
              mr: 4,
              border: '1px solid',
            },
            '&::file-selector-button:hover': {
              bgcolor: theme.palette.grey[100],
            },
          }}
        />
      </Box>
      {/* {isValid && (
        <Typography
          sx={{ fontSize: '12', ml: 2, color: 'grey' }}
          className="text-sm ml-2 text-rose-600"
        >
          {error}
        </Typography>
      )} */}
    </Box>
  );
};

export default InputImage;
