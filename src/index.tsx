import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { previewOffers } from './mocks/offers';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App previewOffers={previewOffers} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
