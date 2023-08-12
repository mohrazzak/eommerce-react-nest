import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import bg from '../../../assets/images/log-in-bg.png';
import SignInImg from '../../../assets/images/signin.png';
import { Link, useNavigate } from 'react-router-dom';

import { Field, FormikProvider } from 'formik';
import { Checkbox, TextField } from 'formik-mui';
import { initialValues, validationSchema } from './FormSettings';
import { useSignInMutation } from '../../../features/api/user/authAPI';
import { useAppDispatch } from '../../../features/store';
import { saveUser } from '../../../features/authSlice';
import useToastify from '../../../hooks/useToastify';
import { useFormik } from 'formik';
import { FormControlLabel, FormGroup } from '@mui/material';
import { useGetWishlistItemsQuery } from '../../../features/api/wishlistAPI';
import { useGetCartItemsQuery } from '../../../features/api/cartItemAPI';
import { useState } from 'react';

const SignInPage = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [signIn, { isError, isSuccess, error, data }] = useSignInMutation();

  const { fireLoading } = useToastify({
    isError,
    isSuccess,
    error,
    data,
    onSuccess: () => {
      if (data)
        dispatch(
          saveUser({
            accessToken: data.data.accessToken,
            name: data?.data.user.name,
            imageURL: data.data.user.imageURL,
          })
        );
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      fireLoading();
      signIn({ email: values.email, password: values.password });
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="xl">
      <Box
        p={4}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          display: 'block',
          width: '100%',
          position: 'relative',
          objectFit: 'contain',
          height: '100%',
          borderRadius: 2,
          p: { xs: 0, sm: 4 },
        }}
      >
        <Grid container>
          <Grid
            item
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
            md={6}
          >
            <Box>
              <Box
                component="img"
                src={SignInImg}
                loading="lazy"
                sx={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            lg={4}
            mx="auto"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              bgcolor={theme.palette.grey[100]}
              sx={{ borderRadius: 2, p: 4, fontSize: '1.4rem' }}
            >
              <Typography fontSize="inherit">Welcome To Saybers</Typography>
              <Typography variant="body2" color="grey" mt={1} fontSize="1rem">
                Login to your Account
              </Typography>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        '& > div': {
                          bgcolor: '#fff',
                          mb: 2,
                        },
                      }}
                    >
                      <Field
                        component={TextField}
                        fullWidth
                        name="email"
                        id="email"
                        label="Email address"
                        variant="outlined"
                      />
                      <Field
                        component={TextField}
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        variant="outlined"
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        mb: 2,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Field
                              type="checkbox"
                              component={Checkbox}
                              id="rememberMe"
                              name="rememberMe"
                              color="primary"
                            />
                          }
                          label={'Remember Me'}
                        />
                      </FormGroup>
                      <Typography
                        component={Link}
                        to="/reset-password"
                        color={theme.palette.primary.main}
                      >
                        Forgot Password?
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting}
                      sx={{ height: '3rem' }}
                    >
                      Sign In
                    </Button>
                  </Box>
                </form>
              </FormikProvider>

              <Box sx={{ fontSize: '1rem', mt: 3, textAlign: 'center' }}>
                <Typography>Doesn't have an account?</Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: theme.palette.primary.main,
                    display: 'block',
                  }}
                  component={Link}
                  to="/signup"
                >
                  Sign Up
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignInPage;
