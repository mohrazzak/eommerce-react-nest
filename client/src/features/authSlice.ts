import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
  isAuth: boolean;
  accessToken: string;
  name: string;
  imageURL: string | null;
}

interface SaveUser {
  accessToken: string;
  name: string;
  imageURL: string | null;
}
interface AuthUser {
  name: string;
  imageURL: string | null;
}
const initialState: AuthSlice = {
  isAuth: false,
  accessToken: '',
  name: '',
  imageURL: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state: AuthSlice, action: PayloadAction<AuthUser>) => {
      state.isAuth = true;
      state.name = action.payload.name;
      state.imageURL = action.payload.imageURL;
    },

    saveUser: (state: AuthSlice, action: PayloadAction<SaveUser>) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          accessToken: action.payload.accessToken,
          name: action.payload.name,
        })
      );
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
    },
    clearUser: (state: AuthSlice) => {
      localStorage.clear();
      state.isAuth = false;
      state.accessToken = '';
    },
  },
});

export const { saveUser, clearUser, authUser } = authSlice.actions;

export default authSlice.reducer;
