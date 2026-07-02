import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SortType } from '../../const/common';
import { AppRoute } from '../../const/infrastructure';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import { City } from '../../types/common';
import Layout from '../layout/layout';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  numberOfOffers: number;
}

const tempActiveCity: City = 'Dusseldorf';

function App({ numberOfOffers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />} >
          <Route index element={<Main numberOfOffers={numberOfOffers} activeCity={tempActiveCity} currentSortType={SortType.Popular} />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />

          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
