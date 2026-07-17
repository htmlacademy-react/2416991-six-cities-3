import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SortType } from '../../const/common';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import { OfferPreview } from '../../types/offer';
import AuthGuard from '../auth-guard/auth-guard';
import Layout from '../layout/layout';
import { Helmet } from 'react-helmet-async';
import { tempActiveCity } from '../../mocks/mock';

type AppProps = {
  previewOffers: OfferPreview[];
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
