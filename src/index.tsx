import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { previewOffers } from './mocks/offers';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        {/* previewOffers пока что из моков */}
        <App previewOffers={previewOffers} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
