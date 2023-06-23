import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import { TextField } from 'formik-mui';
import { useNavigate } from 'react-router-dom';
import bg from '../../../assets/images/log-in-bg.png';
import ResetPasswordImg from '../../../assets/images/reset-passwod.png';

import { initialValues, validationSchema } from './FormSettings';
import { useResetPasswordMutation } from '../../../features/api/user/authAPI';
import useToastify from '../../../hooks/useToastify';

const ResetPasswordPage = () => {
  const theme = useTheme();
  const [resetPassword, { isError, isSuccess, error, data }] =
    useResetPasswordMutation();
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
      resetPassword({ email: values.email });
      fireLoading();
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
                src={ResetPasswordImg}
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
              sx={{ borderRadius: 2, p: 4, fontSize: '1.4rem', width: '100%' }}
            >
              <Typography fontSize="inherit">Welcome To Saybers</Typography>
              <Typography variant="body2" color="grey" mt={1} fontSize="1rem">
                Reset your password
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
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    disabled={formik.isSubmitting}
                    sx={{ height: '3rem' }}
                  >
                    Reset Password
                  </Button>
                </form>
              </FormikProvider>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
