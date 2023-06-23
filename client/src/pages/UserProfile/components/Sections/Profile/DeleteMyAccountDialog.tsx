import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import {
  deleteUserInitialValues,
  deleteUserValidationSchema,
} from './FormSettings';
import useToastify from '../../../../../hooks/useToastify';
import { useDeleteUserMutation } from '../../../../../features/api/user/userAPI';
import { TextField } from 'formik-mui';
import { useAppDispatch } from '../../../../../features/store';
import { clearUser } from '../../../../../features/authSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteMyAccountDialog = ({ open, handleClose, handleConfirm }: Props) => {
  const [deleteUser, deleteUserProps] = useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { fireLoading } = useToastify(deleteUserProps);

  const formik = useFormik({
    initialValues: deleteUserInitialValues,
    validationSchema: deleteUserValidationSchema,
    onSubmit: (values) => {
      deleteUser({ password: values.password });
      fireLoading();
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    if (deleteUserProps.isSuccess) {
      setTimeout(() => {
        dispatch(clearUser());
        navigate('/signin');
      }, 500);
    }
  }, [deleteUserProps.isSuccess, dispatch, navigate]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title">
            {'Are you sure you want to delete your account?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All you data, orders, cart, etc.. will be lost forever.
            </DialogContentText>

            <Grid container mt={3}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
              color="secondary"
            >
              Close
            </Button>
            <Button type="submit">Delete</Button>
          </DialogActions>
        </form>
      </FormikProvider>
    </Dialog>
  );
};

export default DeleteMyAccountDialog;
