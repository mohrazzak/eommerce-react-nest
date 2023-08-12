import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { wishlistItemPath } from '../../api/routes';
import { IResponse, WishlistItemProduct } from '../../interfaces';
import { createSelector } from '@reduxjs/toolkit';

interface GetAllWishlistItemsResponse extends IResponse {
  data: { wishlistItems: WishlistItemProduct[] };
}

interface CartItemApiResponse extends IResponse {
  data: {
    wishlistItem: WishlistItemProduct;
  };
}

export const wishlistItemApi = createApi({
  reducerPath: 'wishlistItemApi',
  tagTypes: ['wishlistItem'],
  baseQuery: fetchBaseQuery({
    baseUrl: wishlistItemPath,
    prepareHeaders: (headers: Headers) => {
      const token = JSON.parse(localStorage.getItem('user') || '{}');
      if (token) headers.set('authorization', `Bearer ${token.accessToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getWishlistItems: builder.query<GetAllWishlistItemsResponse, void>({
      query: () => ({ url: `` }),
      transformResponse: (res: GetAllWishlistItemsResponse) => {
        const sortedCartItems = res.data.wishlistItems.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return {
          message: res.message,
          data: { wishlistItems: sortedCartItems },
          statusCode: res.statusCode,
        };
      },
      providesTags: ['wishlistItem'],
    }),
    toggleWishlistItem: builder.mutation<
      CartItemApiResponse,
      { productId: number }
    >({
      query: (body) => ({
        url: ``,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['wishlistItem'],
    }),
  }),
});

export const { useToggleWishlistItemMutation, useGetWishlistItemsQuery } =
  wishlistItemApi;
export const selectWishlistItems =
  wishlistItemApi.endpoints.getWishlistItems.select();

export const selectWishlistItemData = createSelector(
  selectWishlistItems,
  (usersResult) => usersResult.data?.data.wishlistItems
);
