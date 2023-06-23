import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersPath } from '../../../api/routes';
import { authUser } from '../../authSlice';
import { User } from '@prisma/client';

interface UserApiResponse {
  data: { user: User };
  message: string;
  statusCode: number;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['users'],
  baseQuery: fetchBaseQuery({
    baseUrl: usersPath,
    prepareHeaders: (headers: Headers) => {
      const token = JSON.parse(localStorage.getItem('user') || '{}');
      if (token) headers.set('authorization', `Bearer ${token.accessToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMyInfo: builder.query<UserApiResponse, void>({
      query: () => ({ url: `/me` }),
      providesTags: ['users'],
      async onQueryStarted(_, actions) {
        const fetchedData = (await actions.queryFulfilled).data.data.user;
        actions.dispatch(
          authUser({ name: fetchedData.name, imageURL: fetchedData.imageURL })
        );
      },
    }),
    updateUser: builder.mutation<UserApiResponse, FormData>({
      query: (body) => ({ method: 'PUT', url: `/`, body }),
      invalidatesTags: ['users'],
    }),
    updateUserPassword: builder.mutation<
      UserApiResponse,
      { oldPassword: string; newPassword: string }
    >({
      query: (body) => ({
        method: 'PATCH',
        url: `/update-password`,
        body,
      }),
    }),
    deleteUser: builder.mutation<UserApiResponse, { password: string }>({
      query: (body) => ({
        method: 'DELETE',
        url: `/`,
        body,
      }),
    }),
  }),
});

export const {
  useGetMyInfoQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useDeleteUserMutation,
} = userApi;
