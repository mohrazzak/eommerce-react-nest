import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .matches(
      /^[a-zA-Z]+\s[a-zA-Z]+$/,
      'Please enter your full name (first name and last name)'
    ),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Minimum password length is 8 characters.')
    .max(16, 'Maximum password length is 16 characters.')
    .matches(
      /^(?=.*[a-z])/g,
      'Password should contain at least one lowercase letter.'
    )
    .matches(
      /^(?=.*[A-Z])/g,
      'Password should contain at least one uppercase letter.'
    )
    .matches(/^(?=.*\d)/g, 'Password should contain at least one digit.'),
  acceptedTerms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
  acceptedTerms: false,
};
