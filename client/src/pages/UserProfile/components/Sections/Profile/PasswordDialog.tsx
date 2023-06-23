import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
} from '@mui/material';
import { Country, State } from 'country-state-city';
import { Field, FormikProvider, useFormik, Form } from 'formik';
import { Select, TextField } from 'formik-mui';
import {
  passwordInitialValues,
  passwordValidationSchema,
} from './FormSettings';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../../../../features/api/user/addressAPI';
import useToastify from '../../../../../hooks/useToastify';
import {
  useGetMyInfoQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from '../../../../../features/api/user/userAPI';

interface Props {
  setOpenDialog: (state: boolean) => void;
  openDialog: boolean;
}

const PasswordDialog = ({ openDialog, setOpenDialog }: Props) => {
  const [updatePassword, updateUserPasswordProps] =
    useUpdateUserPasswordMutation();
  const { fireLoading: fireLoadingUpdate } = useToastify(
    updateUserPasswordProps
  );

  const formik = useFormik({
    initialValues: passwordInitialValues,
    validationSchema: passwordValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      fireLoadingUpdate();
      updatePassword(values);
      handleCloseDialog();
      setSubmitting(false);
    },
  });

  function handleCloseDialog() {
    setOpenDialog(false);
    formik.resetForm();
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="xs"
      fullWidth
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <DialogTitle>Edit your info</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} mt={2}>
                <Field
                  component={TextField}
                  fullWidth
                  id="oldPassword"
                  name="oldPassword"
                  label="Previous Password"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

export default PasswordDialog;
