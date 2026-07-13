import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SortType } from '../../const/common';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import { City, OfferPreview } from '../../types/offer';
import AuthGuard from '../auth-guard/auth-guard';
import Layout from '../layout/layout';
import { Helmet } from 'react-helmet-async';

type AppProps = {
  previewOffers: OfferPreview[];
};

const tempActiveCity: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 12,
  },
};

function App({ previewOffers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Helmet>
        <title>6 Cities</title>
      </Helmet>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route
            index
            element={
              <Main
                activeCity={tempActiveCity}
                currentSortType={SortType.Popular}
                offers={previewOffers}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <AuthGuard
                expectedStatus={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Root}
              >
                <Login />
              </AuthGuard>
            }
          />

          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />

          <Route
            path={AppRoute.Favorites}
            element={
              <AuthGuard
                expectedStatus={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Login}
              >
                <Favorites favoriteOffers={previewOffers} />
              </AuthGuard>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
