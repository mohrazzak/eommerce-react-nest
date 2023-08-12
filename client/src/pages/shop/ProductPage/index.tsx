import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Theme,
  Typography,
  circularProgressClasses,
  useMediaQuery,
  useTheme,
  TextField,
  TextareaAutosize,
  Button,
} from '@mui/material';
import SideSection from './sections/SideSection';
import ImgSlider from './sections/ImgSlider';
import MainImage from './sections/MainImage';
import Section from './sections/Section';
import { useState } from 'react';

enum WideSection {
  DESCRIPTION,
  REVIEWS,
}

const ProductPage = () => {
  const images = [
    'https://m.media-amazon.com/images/I/61UxfXTUyvL.jpg',
    'https://www.pngitem.com/pimgs/m/117-1176316_mac-png-clipart-apple-mac-computer-transparent-png.png',
    'https://m.media-amazon.com/images/I/61UxfXTUyvL.jpg',
    'https://m.media-amazon.com/images/I/61UxfXTUyvL.jpg',
    'https://m.media-amazon.com/images/I/61UxfXTUyvL.jpg',
  ];
  const [selectedImage, setSelectedImageIndex] = useState(images[0]);
  const [selectedSection, setSelectedSection] = useState<WideSection>(
    WideSection.DESCRIPTION
  );

  const handleChangeImage = (e: string) => {
    setSelectedImageIndex(e);
  };

  const matchDownSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const theme = useTheme();
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Grid container className="everything" spacing={2}>
          <Grid item className="left-section" xs={12} md={10}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} className="images">
                <Grid
                  container
                  spacing={1}
                  sx={{ position: 'sticky', top: 75 }}
                >
                  <Grid item xs={12} sm={10} order={matchDownSM ? 1 : 2}>
                    <MainImage image={selectedImage} />
                  </Grid>
                  <Grid item xs={12} sm={2} order={matchDownSM ? 2 : 1}>
                    <ImgSlider
                      images={images}
                      handleChangeImage={handleChangeImage}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} className="section">
                <Section />
              </Grid>
              <Grid item xs={12} className="section">
                <Box
                  sx={{
                    display: 'flex',
                    '& > div': {
                      overflow: 'hidden',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        width: '100%', // Set initial width to 100%
                        height: '3px',
                        position: 'absolute',
                        bgcolor: theme.palette.primary.dark,
                        top: 0,
                        left: 0,
                        transition: 'transform .3s', // Keep the transition property for the transform
                      },
                      '&:hover::before': {
                        transform: 'translateX(0%)', // Move the pseudo-element back to its original position (left: 0)
                      },
                      py: 1,
                      cursor: 'pointer',
                      px: 4,
                      '&:hover': { bgcolor: '#fff' },
                      transition: '.3s',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                    },
                  }}
                >
                  <Box
                    bgcolor={
                      selectedSection == WideSection.DESCRIPTION
                        ? '#ffff'
                        : '#eee'
                    }
                    sx={{
                      '&::before': {
                        transform:
                          selectedSection == WideSection.DESCRIPTION
                            ? 'translateX(0)'
                            : 'translateX(-100%)',
                      },
                    }}
                    onClick={() => setSelectedSection(WideSection.DESCRIPTION)}
                  >
                    Description
                  </Box>
                  <Box
                    bgcolor={
                      selectedSection == WideSection.REVIEWS ? '#ffff' : '#eee'
                    }
                    sx={{
                      '&::before': {
                        transform:
                          selectedSection == WideSection.REVIEWS
                            ? 'translateX(0)'
                            : 'translateX(-100%)',
                      },
                    }}
                    onClick={() => setSelectedSection(WideSection.REVIEWS)}
                  >
                    Review
                  </Box>
                </Box>
                {selectedSection === WideSection.DESCRIPTION ? (
                  <Typography mt={2}>
                    Jelly beans carrot cake icing biscuit oat cake gummi bears
                    tart. Lemon drops carrot cake pudding sweet gummi bears.
                    Chocolate cake tart cupcake donut topping liquorice sugar
                    plum chocolate bar. Jelly beans tiramisu caramels jujubes
                    biscuit liquorice chocolate. Pudding toffee jujubes oat cake
                    sweet roll. Lemon drops dessert croissant danish cake
                    cupcake. Sweet roll candy chocolate toffee jelly sweet roll
                    halvah brownie topping. Marshmallow powder candy sesame
                    snaps jelly beans candy canes marshmallow gingerbread pie.
                    Organic: vitae et leo duis ut diam quam nulla porttitor
                    massa id neque aliquam vestibulum morbi blandit cursus risus
                    at ultrices mi tempus imperdiet nulla malesuada pellentesque
                    elit eget gravida cum sociis natoque penatibus et magnis dis
                    parturient montes nascetur ridiculus mus mauris vitae
                    ultricies leo integer malesuada nunc vel risus commodo
                    viverra maecenas accumsan lacus vel facilisis volutpat est
                    velit egestas dui id ornare arcu odio ut sem nulla pharetra
                    diam sit amet nisl suscipit adipiscing bibendum est
                    ultricies integer quis auctor elit sed vulputate mi sit amet
                    mauris commodo quis imperdiet massa tincidunt nunc pulvinar
                    sapien et ligula ullamcorper malesuada proin libero nunc
                    consequat interdum varius sit amet mattis vulputate enim
                    nulla aliquet porttitor lacus luctus accumsan.
                  </Typography>
                ) : (
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <Box mt={2}>
                        <Typography sx={{ fontSize: '1.2rem' }}>
                          Customer Reviews
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mt: 1,
                          }}
                        >
                          <Rating value={3} readOnly size="small" />
                          <Typography>4.2 Out Of 5</Typography>
                        </Box>
                        <Box mt={2}>
                          {[5, 4, 3, 2, 1].map((e) => (
                            <Box
                              key={e}
                              display="flex"
                              alignItems="center"
                              mt={2}
                              sx={{ gap: 2 }}
                            >
                              <Typography>{e} Star</Typography>
                              <Box
                                sx={{
                                  flexGrow: 1,
                                  bgcolor: '#eee',
                                }}
                              >
                                <Box
                                  sx={{
                                    height: '1rem',
                                    width: '75%',
                                    borderRadius: 2,
                                    color: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    bgcolor: theme.palette.primary.main,
                                  }}
                                >
                                  53%
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Add a review</Typography>
                      <Box mt={2}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <TextField
                              id="outlined-basic"
                              label="Outlined"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="outlined-basic"
                              label="Outlined"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="outlined-basic"
                              label="Outlined"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="outlined-basic"
                              label="Outlined"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Your comment"
                              multiline
                              rows={4}
                              maxRows={8}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              fullWidth
                              color="secondary"
                            >
                              Add a review
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className="sideSection"
            xs={0}
            md={2}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <SideSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductPage;
