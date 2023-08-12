import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersPath } from '../../../api/routes';
import { authUser } from '../../authSlice';
import { User } from '@prisma/client';
import { CartItemProduct } from 'src/interfaces';
import { createSelector } from '@reduxjs/toolkit';
import { setCart } from '../../cartSlice';

interface UserWithCart extends User {
  CartItems: CartItemProduct[];
}

interface UserApiResponse {
  data: { user: UserWithCart };
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
        actions.dispatch(setCart(fetchedData.CartItems));
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

export const selectUsersResult = userApi.endpoints.getMyInfo.select();

export const selectUserData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data?.data.user
);
