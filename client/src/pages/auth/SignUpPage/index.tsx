import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import bg from '../../../assets/images/log-in-bg.png';
import SignUpImage from '../../../assets/images/signup.png';
import { Link, useNavigate } from 'react-router-dom';

import { Field, FormikProvider, useFormik } from 'formik';
import { Checkbox, TextField } from 'formik-mui';
import { validationSchema, initialValues } from './FormSettings';
import useToastify from '../../../hooks/useToastify';
import { useSignUpMutation } from '../../../features/api/user/authAPI';

const SignUpPage = () => {
  const theme = useTheme();
  const [signup, { isError, isSuccess, error, data }] = useSignUpMutation();

  const navigate = useNavigate();
  const { fireLoading } = useToastify({
    isError,
    isSuccess,
    error,
    data,
    onSuccess: () => {
      navigate('/signin');
    },
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      fireLoading();
      signup({
        email: values.email,
        password: values.password,
        name: values.fullName,
      });
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
                loading="lazy"
                src={SignUpImage}
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
                Create New Account
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
                        name="fullName"
                        id="fullName"
                        label="Full Name"
                        variant="outlined"
                      />
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
                    <FormGroup sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Field
                            type="checkbox"
                            component={Checkbox}
                            id="acceptedTerms"
                            name="acceptedTerms"
                            color="primary"
                          />
                        }
                        label={'I agree with Terms and Privacy'}
                      />
                      {formik.touched.acceptedTerms &&
                        formik.errors.acceptedTerms && (
                          <FormHelperText error>
                            {formik.errors.acceptedTerms}
                          </FormHelperText>
                        )}
                    </FormGroup>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting}
                      sx={{ height: '3rem' }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </form>
              </FormikProvider>
              <Box sx={{ fontSize: '1rem', mt: 3, textAlign: 'center' }}>
                <Typography>Already have an account?</Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: theme.palette.primary.main,
                    display: 'block',
                  }}
                  component={Link}
                  to="/signin"
                >
                  Sign In
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUpPage;
