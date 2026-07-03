import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SortType } from '../../const/common';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import { City } from '../../types/common';
import AuthGuard from '../auth-guard/auth-guard';
import Layout from '../layout/layout';
import NotFound from '../../pages/not-found/not-found';

type AppProps = {
  numberOfOffers: number;
}

const tempActiveCity: City = 'Dusseldorf';

function App({ numberOfOffers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />} >
          <Route index element={<Main numberOfOffers={numberOfOffers} activeCity={tempActiveCity} currentSortType={SortType.Popular} />} />
          <Route path={AppRoute.Login} element={
            <AuthGuard expectedStatus={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <Login />
            </AuthGuard>
          }
          />
          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />

          <Route path={AppRoute.Favorites} element={
            <AuthGuard expectedStatus={AuthorizationStatus.Auth} redirectTo={AppRoute.Login}>
              <Favorites />
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
