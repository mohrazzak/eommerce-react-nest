import React, { useEffect, useCallback } from 'react';
import { Id, toast } from 'react-toastify';
import { useAppDispatch } from '../features/store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { SerializedError } from '@reduxjs/toolkit';
interface Props {
  isSuccess: boolean;
  isError: boolean;
  data?: { message: string };
  error?: FetchBaseQueryError | SerializedError;
  onSuccess?: () => void;
  onFailed?: () => void;
}
interface ErrorResponseData {
  message?: string;
}
export default function useToastify({
  isSuccess,
  isError,
  data,
  error,
  onSuccess,
  onFailed,
}: Props) {
  const typedError =
    error && 'status' in error
      ? (error?.data as ErrorResponseData)
      : { message: 'Error' };

  const toastId = React.useRef<Id | undefined>();
  const dispatch = useAppDispatch();

  const fireLoading = () => (toastId.current = toast.loading('Loading...'));

  const fireUpdate = useCallback(() => {
    if (toastId.current !== undefined) {
      toast.update(toastId.current, {
        render: isSuccess
          ? data?.message || ''
          : data?.message ||
            typedError?.message ||
            typedError?.message?.[0] ||
            'Error',

        type: isSuccess ? 'success' : 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  }, [isSuccess, data?.message, typedError.message]);

  useEffect(() => {
    if (isSuccess) {
      fireUpdate();
      onSuccess && onSuccess();
    }
    if (isError) {
      fireUpdate();
      onFailed && onFailed();
    }
  }, [isSuccess, isError, dispatch, fireUpdate, onSuccess, onFailed]);

  return { fireLoading, fireUpdate, typedError };
}
