import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { previewOffers } from './mocks/offers';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App previewOffers={previewOffers} />
    </HelmetProvider>
  </React.StrictMode>
);
