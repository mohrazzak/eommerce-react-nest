import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'swiper/swiper-bundle.css';

import './index.css';
import { Provider } from 'react-redux';

import { store } from './features/store.ts';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
