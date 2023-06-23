import { useSearchParams, useNavigate } from 'react-router-dom';
import { useActivateMutation } from '../../../features/api/user/authAPI';
import { useEffect } from 'react';
import Loader from '../../../Layout/Loader';
import useToastify from '../../../hooks/useToastify';
const ActivatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activateToken = searchParams.get('activateToken') || '';
  const [activate, { isSuccess, error, isError, data }] = useActivateMutation();
  const { fireLoading } = useToastify({
    isError,
    isSuccess,
    error,
    data,
    onSuccess: () => {
      navigate('/signin');
    },
    onFailed: () => {
      navigate('/signin');
    },
  });

  useEffect(() => {
    activate({ activateToken });
    fireLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate, activateToken]);

  return <Loader />;
  // return (
  //   <>
  //     {isLoading ? (
  //       <Loader />
  //     ) : (
  //       <Box
  //         sx={{
  //           p: 4,
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             bgcolor: '#eee',
  //             width: '500px',
  //             p: 4,
  //             marginX: 'auto',
  //           }}
  //         >
  //           <Typography
  //             sx={{
  //               color: theme.palette.primary.main,
  //               fontSize: '1.2rem',
  //               fontWeight: 'bold',
  //               mb: 2,
  //             }}
  //           >
  //             Please choose your new password carefully
  //           </Typography>
  //           <FormikProvider value={formik}>
  //             <form onSubmit={formik.handleSubmit}>
  //               <Box
  //                 sx={{
  //                   mt: 2,
  //                 }}
  //               >
  //                 <Box
  //                   sx={{
  //                     '& > div': {
  //                       bgcolor: '#fff',
  //                       mb: 2,
  //                     },
  //                   }}
  //                 >
  //                   <Field
  //                     component={TextField}
  //                     fullWidth
  //                     name="password"
  //                     id="password"
  //                     label="New Password"
  //                     variant="outlined"
  //                   />
  //                   <Field
  //                     component={TextField}
  //                     fullWidth
  //                     id="passwordConfirmation"
  //                     name="passwordConfirmation"
  //                     label="Confirm Password"
  //                     variant="outlined"
  //                   />
  //                 </Box>

  //                 <Button
  //                   variant="contained"
  //                   color="secondary"
  //                   type="submit"
  //                   fullWidth
  //                   disabled={formik.isSubmitting}
  //                   sx={{ height: '3rem' }}
  //                 >
  //                   Change Password
  //                 </Button>
  //               </Box>
  //             </form>
  //           </FormikProvider>
  //         </Box>
  //       </Box>
  //     )}
  //   </>
  // );
};

export default ActivatePage;
