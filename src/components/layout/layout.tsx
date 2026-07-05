import { matchPath, Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import { getAuthStatus } from '../../mocks/mock';
import Footer from '../footer/footer';
import Header from '../header/header';

const getContainerModifications = (pathname: string): string => {
  if (matchPath(AppRoute.Root, pathname)) {
    return 'page--gray page--main';
  }
  if (matchPath(AppRoute.Login, pathname)) {
    return 'page--gray page--login';
  }
  return '';
};

const getMainElementModifications = (pathname: string): string => {
  if (matchPath(AppRoute.Root, pathname)) {
    return 'page__main--index';
  }
  if (matchPath(AppRoute.Login, pathname)) {
    return 'page__main--login';
  }
  if (matchPath(AppRoute.Favorites, pathname)) {
    return 'page__main--favorites';
  }
  if (matchPath(`${AppRoute.Offer}/:id`, pathname)) {
    return 'page__main--offer';
  }
  return '';
};

function Layout(): JSX.Element {
  const location = useLocation();
  const authStatus = getAuthStatus();

  const isFooterNeeded =
    !matchPath(AppRoute.Root, location.pathname) &&
    !matchPath(AppRoute.Login, location.pathname) &&
    !matchPath(`${AppRoute.Offer}/:id`, location.pathname);

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
