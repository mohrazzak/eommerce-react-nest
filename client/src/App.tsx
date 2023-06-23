// core
import { lazy, Suspense, useEffect } from 'react';

// NPM
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

// MUI
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

import { useGetMyInfoQuery } from './features/api/user/userAPI';
import { useAppDispatch } from './features/store';
import { authUser } from './features/authSlice';
import ShopPage from './pages/shop';

// ==  VIEWS

// AUTH
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));
const SignInPage = lazy(() => import('./pages/auth/SignInPage'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPasswordPage'));
const ResResetPassword = lazy(() => import('./pages/auth/ResResetPassword'));
const ActivatePage = lazy(() => import('./pages/auth/ActivatePage'));

// GUARDS
const ProtectedRoute = lazy(() => import('./Layout/ProtectedRoute'));
const NotProtectedRoute = lazy(() => import('./Layout/NotProtectedRoute'));

// LAYOUTS
const Layout = lazy(() => import('./Layout'));
const Loader = lazy(() => import('./Layout/Loader'));

// PAGES
const Home = lazy(() => import('./pages/HomePage'));
const Error404 = lazy(() => import('./pages/Errors/Error404'));
const UserProfile = lazy(() => import('./pages/UserProfile'));


// CUSTOM THEME
const theme = createTheme({
  palette: {
    primary: {
      main: '#417394',
    },
    common: { white: '#f8f8f8', black: '#1d2328' },
    secondary: { main: '#ff4f4f' },
    grey: { '500': '#bfbfbf', '900': '#ececec33' },
  },
  typography: { fontFamily: "'Rubik', sans-serif" },
});

const App: React.FC = () => {
  const { isSuccess, data, isLoading } = useGetMyInfoQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        authUser({
          name: data.data.user.name,
          imageURL: data.data.user.imageURL,
        })
      );
    }
  }, [dispatch, isSuccess]);

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* USER RELATED */}

              <Route
                path={'signup'}
                element={
                  <NotProtectedRoute>
                    <SignUpPage />
                  </NotProtectedRoute>
                }
              />
              <Route
                path={'signin'}
                element={
                  <NotProtectedRoute>
                    <SignInPage />
                  </NotProtectedRoute>
                }
              />
              <Route
                path={'activate'}
                element={
                  <NotProtectedRoute>
                    <ActivatePage />
                  </NotProtectedRoute>
                }
              />
              <Route
                path={'reset-password'}
                element={
                  <NotProtectedRoute>
                    <ResetPassword />
                  </NotProtectedRoute>
                }
              />
              <Route
                path={'reset-password/confirm'}
                element={
                  <NotProtectedRoute>
                    <ResResetPassword />
                  </NotProtectedRoute>
                }
              />
              <Route path={'profile'} element={<UserProfile />} />
              <Route path={'shop'}>
                <Route index element={<ShopPage />} />
                <Route path={':productId'} element={<Home />} />
              </Route>
              <Route path={'cart'} element={<Home />} />
              <Route path={'wishlist'} element={<Home />} />
              <Route path={'account'} element={<Home />} />
              <Route path={'checkout'} element={<Home />} />
              <Route path={'about-us'} element={<Home />} />
              <Route path={'*'} element={<Error404 />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
