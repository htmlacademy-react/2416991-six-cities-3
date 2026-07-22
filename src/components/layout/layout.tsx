import { matchPath, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';
import { getAuthStatus } from '../../mocks/mock';
import Footer from '../footer/footer';
import Header from '../header/header';
import {
  getContainerModifications,
  getMainElementModifications,
} from './utils';
import { useAppSelector } from '../../hooks';

function Layout(): JSX.Element {
  const locationPathname = useLocation().pathname;
  const authStatus = getAuthStatus();
  const isEmpty = useAppSelector((state) => state.processedOffers.length < 1);

  const isFooterNeeded =
    !matchPath(AppRoute.Root, locationPathname) &&
    !matchPath(AppRoute.Login, locationPathname) &&
    !matchPath(`${AppRoute.Offer}/:id`, locationPathname);

  const containerModifications = getContainerModifications(
    locationPathname,
    authStatus,
  );

  const mainElementModifications =
    getMainElementModifications(locationPathname, isEmpty);

  return (
    <div className={`page ${containerModifications}`}>
      <Header />
      <main className={`page__main ${mainElementModifications}`}>
        <Outlet />
      </main>
      {isFooterNeeded && <Footer />}
    </div>
  );
}

export default Layout;
