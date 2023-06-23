import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
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
  passwordConfirmation: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export const initialValues = {
  password: '',
  passwordConfirmation: '',
};
