import { Box, useTheme, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import image from '../../../assets/images/laptop-lanscape.jpg';
import { Autoplay, Pagination, Navigation } from 'swiper';

const sliders = [
  {
    title: "High quality furniture's",
    subTitle: 'AT LOWEST PRICE!',
    image: image,
  },
  {
    title: 'Latest tech products',
    subTitle: 'AS ALWAYS!',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABaz49O0W5W0KvQSflLzjqggFZQt0-OYVJw&usqp=CAU',
  },
];

const ImgSlider = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 2 }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {sliders.map((slider, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                backgroundImage: `url(${slider.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                objectFit: 'contain',
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: { xs: 'center', sm: 'end' },
                alignItems: 'center',
                py: { xs: 1, md: 3 },
                px: 5,
              }}
            >
              <Box
                sx={{
                  bgcolor: theme.palette.primary.main,
                  p: 3,
                  borderRadius: 1,
                  opacity: '0.9',
                  color: '#fff',
                  width: { xs: '100%', md: 'auto' },
                  height: { xs: '100%', md: 'auto' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.2rem', md: '2rem' },
                    fontWeight: 'bold',
                  }}
                >
                  {slider.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'orange',
                    fontWeight: 'bold',
                    letterSpacing: 5,
                    fontSize: { xs: '1rem', md: '1.5rem' },
                  }}
                >
                  {slider.subTitle}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImgSlider;
