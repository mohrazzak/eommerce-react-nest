import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  addressLine1: Yup.string()
    .max(50, 'Address Line 2 must be less than 50 characters')
    .required('First address line is required'),
  addressLine2: Yup.string().max(
    50,
    'Address Line 2 must be less than 50 characters'
  ),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),

  postalCode: Yup.string().required('Postal Code is required'),
  addressName: Yup.string().required('Address Name is required'),
});

export const initialValues = {
  id: 0,
  name: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  state: '',
  country: '',
  postalCode: '',
  addressName: '',
  isDefault: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};
