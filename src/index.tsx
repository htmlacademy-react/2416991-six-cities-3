import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ToastContainer />
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
