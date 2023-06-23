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
import { initialValues, validationSchema } from './FormSettings';
import { IAddress } from '.';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../../../../features/api/user/addressAPI';
import useToastify from '../../../../../hooks/useToastify';

interface Props {
  setOpenDialog: (state: boolean) => void;
  openDialog: boolean;
  address?: IAddress;
  editing?: boolean;
}

const AddressDialog = ({
  openDialog,
  setOpenDialog,
  address,
  editing = false,
}: Props) => {
  const [addAddress, addAddressProps] = useAddAddressMutation();
  const { fireLoading: fireLoadingAdd } = useToastify(addAddressProps);

  const [updateAddress, updateAddressProps] = useUpdateAddressMutation();
  const { fireLoading: fireLoadingUpdate } = useToastify(updateAddressProps);

  const formik = useFormik({
    initialValues: address || initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!editing) {
        fireLoadingAdd();
        await addAddress(values);
      } else {
        fireLoadingUpdate();
        await updateAddress(values);
      }
      handleCloseDialog();
      setSubmitting(false);
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
      maxWidth="sm"
      fullWidth
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <DialogTitle>Add an address</DialogTitle>
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
              <Grid item sm={6} xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email address"
                  variant="outlined"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone number"
                  variant="outlined"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addressLine1"
                  name="addressLine1"
                  label="Address Line 1"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addressLine2"
                  name="addressLine2"
                  label="Address Line 2"
                  variant="outlined"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Field
                    name="country"
                    component={Select}
                    labelId="country-label"
                    id="country"
                    label="Country"
                    MenuProps={{
                      sx: {
                        height: '20rem',
                        width: '200px',
                      },
                    }}
                  >
                    {Country.getAllCountries().map((country, i) => (
                      <MenuItem
                        value={country.isoCode}
                        key={i}
                        sx={{
                          maxWidth: '100%',
                          wordBreak: 'break-all',
                          wordWrap: 'break-word',
                        }}
                      >
                        {country.name}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addressName"
                  name="addressName"
                  label="Address name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Field
                    name="state"
                    component={Select}
                    id="state"
                    label="State"
                    MenuProps={{
                      sx: {
                        height: '20rem',
                      },
                    }}
                  >
                    {State.getStatesOfCountry(formik.values.country).map(
                      (state, i) => (
                        <MenuItem value={state.isoCode} key={i}>
                          {state.name}
                        </MenuItem>
                      )
                    )}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Field
                  fullWidth
                  component={TextField}
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">{editing ? 'Edit' : 'Create'}</Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

export default AddressDialog;
