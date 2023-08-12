import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cartItemsPath } from '../../api/routes';
import { CartItemProduct, IResponse } from '../../interfaces';
import { createSelector } from '@reduxjs/toolkit';

interface GetAllCartItemsResponse extends IResponse {
  data: { cartItems: CartItemProduct[] };
}

interface CartItemApiResponse extends IResponse {
  data: {
    cartItem: CartItemProduct;
  };
}

export const cartItemApi = createApi({
  reducerPath: 'cartItemApi',
  tagTypes: ['cartItem'],
  baseQuery: fetchBaseQuery({
    baseUrl: cartItemsPath,
    prepareHeaders: (headers: Headers) => {
      const token = JSON.parse(localStorage.getItem('user') || '{}');
      if (token) headers.set('authorization', `Bearer ${token.accessToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCartItems: builder.query<GetAllCartItemsResponse, void>({
      query: () => ({ url: `` }),
      transformResponse: (res: GetAllCartItemsResponse) => {
        const sortedCartItems = res.data.cartItems.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return {
          message: res.message,
          data: { cartItems: sortedCartItems },
          statusCode: res.statusCode,
        };
      },
      providesTags: ['cartItem'],
    }),
    addCartItem: builder.mutation<
      CartItemApiResponse,
      { quantity: number; productId: number }
    >({
      query: (body) => ({
        url: ``,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cartItem'],
    }),
    updateCartItem: builder.mutation<CartItemApiResponse, CartItemProduct>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['cartItem'],
    }),
    deleteCartItem: builder.mutation<CartItemApiResponse, { id: number }>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cartItem'],
    }),
    updateCartItemQuantity: builder.mutation<
      CartItemApiResponse,
      IUpdateCartItemQuantity
    >({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PATCH',
        body: { quantity: body.quantity },
      }),
      invalidatesTags: ['cartItem'],
    }),
  }),
});

interface IUpdateCartItemQuantity {
  id: number;
  quantity: number;
}
export const {
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
  useUpdateCartItemQuantityMutation,
} = cartItemApi;
export const selectCartItems = cartItemApi.endpoints.getCartItems.select();

export const selectCartItemsData = createSelector(
  selectCartItems,
  (usersResult) => usersResult.data?.data.cartItems
);
