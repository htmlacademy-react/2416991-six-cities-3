import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import Layout from '../layout/layout';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import Loading from '../../pages/loading/loading';
import ProtectedRoute from '../protected-route/protected-route';
import { getAuthorizationStatus } from '../../store/slices/user/user.selectors';
import { getOffersLoadingStatus } from '../../store/slices/offers/offers.selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus).isOffersLoading;

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Helmet>
        <title>6 Cities</title>
      </Helmet>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main />} />
          <Route
            path={AppRoute.Login}
            element={
              <ProtectedRoute onlyNoAuth>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />

          <Route
            path={AppRoute.Favorites}
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
