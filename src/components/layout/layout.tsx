import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';
import Footer from '../footer/footer';
import Header from '../header/header';
import { getAuthStatus } from '../../mocks/mock';
import { AuthorizationStatus } from '../../const/infrastructure';

const getContainerModifications = (pathname: string): string => {
  switch (pathname) {
    case AppRoute.Root:
      return 'page--gray page--main';
    case AppRoute.Login:
      return 'page--gray page--login';
    default:
      return '';
  }
};

const getMainElementModifications = (pathname: string): string => {
  switch (pathname) {
    case AppRoute.Root:
      return 'page__main--index';
    case AppRoute.Login:
      return 'page__main--login';
    case AppRoute.Favorites:
      return 'page__main--favorites';
    case AppRoute.Offer:
      return 'page__main--offer';
    default:
      return '';
  }
};

function Layout(): JSX.Element {
  const location = useLocation();
  const authStatus = getAuthStatus();

  const isFooterNeeded = location.pathname !== AppRoute.Root && location.pathname !== AppRoute.Login && location.pathname !== AppRoute.Offer;

  const containerModifications = authStatus !== AuthorizationStatus.Unknown ? getContainerModifications(location.pathname) : '';

  return (
    <div className={`page ${containerModifications}`}>
      <Header />
      <main className={`page__main ${getMainElementModifications(location.pathname)}`}>
        <Outlet />
      </main>
      {isFooterNeeded && (<Footer />)}
    </div>
  );
}

export default Layout;
