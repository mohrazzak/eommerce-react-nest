import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authPath } from '../../../api/routes';
import { User } from '@prisma/client';

interface SignInParams {
  email: string;
  password: string;
}

interface AuthApiResponse {
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
  statusCode: number;
}

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface ResetPasswordParams {
  email: string;
}

interface ResResetPasswordParams {
  password: string;
  resetToken: string;
}

interface ActivateUserResponse {
  data: { user: User };
  message: string;
  statusCode: number;
}

interface ActivateUserResponseParams {
  activateToken: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: authPath,
  }),

  endpoints: (builder) => ({
    signIn: builder.mutation<AuthApiResponse, SignInParams>({
      query: (body) => ({
        url: `/signin`,
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<AuthApiResponse, SignUpParams>({
      query: (body) => ({
        url: `/signup`,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<AuthApiResponse, ResetPasswordParams>({
      query: (body) => ({
        url: `/reset-password`,
        method: 'POST',
        body,
      }),
    }),
    ResResetPassword: builder.mutation<AuthApiResponse, ResResetPasswordParams>(
      {
        query: (body) => ({
          url: `/reset-password`,
          method: 'PUT',
          body,
        }),
      }
    ),
    activate: builder.mutation<
      ActivateUserResponse,
      ActivateUserResponseParams
    >({
      query: (body) => ({
        url: `/activate`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useResetPasswordMutation,
  useActivateMutation,
  useResResetPasswordMutation,
} = authApi;
