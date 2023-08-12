import { Box, Theme, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  images: string[];
  handleChangeImage: (e: string) => void;
}

const ImgSlider = ({ images, handleChangeImage }: Props) => {
  const matchDownSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Box
      sx={{
        userSelect: 'none',
        overflow: 'hidden',
        maxHeight: '500px',
        maxWidth: '90vw',
      }}
    >
      <Swiper
        direction={matchDownSM ? 'horizontal' : 'vertical'}
        height={400}
        slidesPerView={3}
        width={330}
        spaceBetween={20}
      >
        {images.map((e, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                cursor: 'grab',
                display: 'flex',
                justifyContent: 'center',
                bgcolor: '#eee',
                alignItems: 'center',
                borderRadius: 2,
                p: 1,
              }}
              onClick={() => handleChangeImage(e)}
            >
              <Box
                component="img"
                src={e}
                sx={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                loading="lazy"
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImgSlider;
