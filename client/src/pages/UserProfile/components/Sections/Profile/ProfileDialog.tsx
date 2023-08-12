import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { Field, FormikProvider, useFormik, Form } from 'formik';
import { TextField } from 'formik-mui';
import { profileInitialValues, profileValidationSchema } from './FormSettings';
import useToastify from '../../../../../hooks/useToastify';
import { useUpdateUserMutation } from '../../../../../features/api/user/userAPI';
import InputImage from './InputImage';
import { useState } from 'react';
interface Props {
  setOpenDialog: (state: boolean) => void;
  openDialog: boolean;
  editing?: boolean;
  userInfo: { name: string | undefined; phoneNumber: string | undefined };
}

const ProfileDialog = ({ openDialog, setOpenDialog, userInfo }: Props) => {
  const [updateUser, updateUserProps] = useUpdateUserMutation();
  const { fireLoading: fireLoadingUpdate } = useToastify(updateUserProps);
  const [image, setImage] = useState<File | undefined>(undefined);
  const formik = useFormik({
    initialValues: {
      password: profileInitialValues.password,
      name: userInfo.name ? userInfo.name : profileInitialValues.name,
      phoneNumber: userInfo.phoneNumber
        ? userInfo.phoneNumber
        : profileInitialValues.phoneNumber,
    },
    validationSchema: profileValidationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      fireLoadingUpdate();
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phoneNumber', values.phoneNumber);
      if (image) formData.append('imageURL', image);
      formData.append('password', values.password);
      updateUser(formData);
      handleCloseDialog();
      setSubmitting(false);
      setImage(undefined);
    },
    enableReinitialize: true,
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
                  id="name"
                  name="name"
                  label="Full name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="password"
                  name="password"
                  label="Your password"
                  type="password"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <InputImage
                  handleChange={(a, b) => formik.setFieldValue(a, b)}
                  image={image}
                  setImage={setImage}
                  id="imageURL"
                  name="imageURL"
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

export default ProfileDialog;
