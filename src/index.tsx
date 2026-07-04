import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const/common';
import { previewOffers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App numberOfOffers={Setting.NumberOfOffers} previewOffers={previewOffers} />
  </React.StrictMode>
);
