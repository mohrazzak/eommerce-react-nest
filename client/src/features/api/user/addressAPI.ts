import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addressesPath } from '../../../api/routes';
import { IResponse } from '../../../interfaces';
import { Address } from '@prisma/client';

interface GetAllAddressesResponse extends IResponse {
  data: { addresses: Address[] };
}

interface AddressApiResponse extends IResponse {
  data: {
    address: Address;
  };
}

export const addressApi = createApi({
  reducerPath: 'addressApi',
  tagTypes: ['address'],
  baseQuery: fetchBaseQuery({
    baseUrl: addressesPath,
    prepareHeaders: (headers: Headers) => {
      const token = JSON.parse(localStorage.getItem('user') || '{}');
      if (token) headers.set('authorization', `Bearer ${token.accessToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAddresses: builder.query<GetAllAddressesResponse, void>({
      query: () => ({ url: `/` }),
      transformResponse: (res: GetAllAddressesResponse) => {
        const sortedAddresses = res.data.addresses.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return {
          message: res.message,
          data: { addresses: sortedAddresses },
          statusCode: res.statusCode,
        };
      },
      providesTags: ['address'],
    }),
    addAddress: builder.mutation<AddressApiResponse, Address>({
      query: (body) => ({
        url: `/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['address'],
    }),
    updateAddress: builder.mutation<AddressApiResponse, Address>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['address'],
    }),
    deleteAddress: builder.mutation<AddressApiResponse, { id: number }>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['address'],
    }),
    setDefaultAddress: builder.mutation<AddressApiResponse, { id: number }>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['address'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useSetDefaultAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
