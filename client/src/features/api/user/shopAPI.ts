import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { shopPath } from '../../../api/routes';
import { Filter } from '../../../pages/shop';
import { ShopProduct } from '../../../interfaces';

import { Category } from '@prisma/client';

interface GetShopResponse {
  data: { products: ShopProduct[]; categories: Category[] };
  message: string;
  statusCode: number;
}
function convertFiltersToQueryParams(filters: Filter[]): string {
  const queryParams = filters
    .filter((filter) => {
      const { key, value } = filter;

      if (key === 'rating' || key === 'category') {
        return value != null && value !== '';
      } else if (key === 'name') {
        return typeof value === 'string' && value.trim() !== '';
      } else if (key === 'price') {
        const [min, max] = value as number[];
        return typeof min === 'number' && typeof max === 'number';
      }

      return false;
    })
    .map((filter) => {
      const { key, value } = filter;

      if (key === 'price') {
        const [min, max] = value as number[];
        return `priceRange=${min}-${max}`;
      } else if (key === 'category') {
        return `categoryId=${value}`;
      }

      return `${key}=${value}`;
    })
    .join('&');

  return queryParams;
}

export const shopApi = createApi({
  reducerPath: 'shopApi',
  tagTypes: ['shop'],
  baseQuery: fetchBaseQuery({
    baseUrl: shopPath,
    prepareHeaders: (headers: Headers) => {
      const token = JSON.parse(localStorage.getItem('user') || '{}');
      if (token) headers.set('authorization', `Bearer ${token.accessToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getShop: builder.query<GetShopResponse, Filter[]>({
      query: (filters) => ({
        url: `?${convertFiltersToQueryParams(filters)}`,
      }),
      // transformResponse: (res: GetAllAddressesResponse) => {
      //   const sortedAddresses = res.data.addresses.sort(
      //     (a, b) =>
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
      //   return {
      //     message: res.message,
      //     data: { addresses: sortedAddresses },
      //     statusCode: res.statusCode,
      //   };
      // },
      providesTags: ['shop'],
    }),
    // addAddress: builder.mutation<AddressApiResponse, IAddress>({
    //   query: (body) => ({
    //     url: `/`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['shop'],
    // }),
    // updateAddress: builder.mutation<AddressApiResponse, IAddress>({
    //   query: (body) => ({
    //     url: `/${body.id}`,
    //     method: 'PUT',
    //     body: body,
    //   }),
    //   invalidatesTags: ['shop'],
    // }),
    // deleteAddress: builder.mutation<AddressApiResponse, { id: number }>({
    //   query: (body) => ({
    //     url: `/${body.id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['shop'],
    // }),
    // setDefaultAddress: builder.mutation<AddressApiResponse, { id: number }>({
    //   query: (body) => ({
    //     url: `/${body.id}`,
    //     method: 'PATCH',
    //   }),
    //   invalidatesTags: ['shop'],
    // }),
  }),
});

export const { useGetShopQuery } = shopApi;
