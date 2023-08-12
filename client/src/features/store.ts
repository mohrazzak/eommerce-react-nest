import { Store, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/user/authAPI';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './authSlice';
import { userApi } from './api/user/userAPI';
import { addressApi } from './api/user/addressAPI';
import { shopApi } from './api/user/shopAPI';
import { cartItemApi } from './api/cartItemAPI';
import cartSlice from './cartSlice';
import { wishlistItemApi } from './api/wishlistAPI';

export const store: Store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [cartItemApi.reducerPath]: cartItemApi.reducer,
    [wishlistItemApi.reducerPath]: wishlistItemApi.reducer,
    auth: authSlice,
    cart: cartSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      addressApi.middleware,
      shopApi.middleware,
      cartItemApi.middleware,
      wishlistItemApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
