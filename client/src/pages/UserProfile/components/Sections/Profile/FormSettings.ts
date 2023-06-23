import { ImgHTMLAttributes } from 'react';
import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string(),
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
  // imageURL: Yup.mixed()
  //   .nullable()
  //   .required('A file is required')
  //   .test(
  //     'Fichier taille',
  //     'upload file',
  //     (value: Yup.AnyObject) => !value || (value && value.size <= 1024 * 1024)
  //   )
  //   .test(
  //     'format',
  //     'upload file',
  //     (value: Yup.AnyObject) =>
  //       !value || (value && ['png', 'jpeg', 'jpg'].includes(value.type))
  //   ),
});

export const profileInitialValues = {
  name: '',
  phoneNumber: '',
  password: '',
  imageURL: '',
};

export const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
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
  newPassword: Yup.string()
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
      return this.parent.newPassword === value;
    }
  ),
});

export const passwordInitialValues = {
  oldPassword: '',
  newPassword: '',
  passwordConfirmation: '',
};

export const deleteUserValidationSchema = Yup.object().shape({
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
});

export const deleteUserInitialValues = {
  password: '',
};
