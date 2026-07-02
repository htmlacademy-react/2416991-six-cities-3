import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';
import Footer from '../footer/footer';
import Header from '../header/header';

const getContainerModifications = (pathname: string): string => {
  switch (pathname) {
    case AppRoute.Main:
      return 'page--gray page--main';
    case AppRoute.Login:
      return 'page--gray page--login';
    default:
      return '';
  }
};

const getMainElementModifications = (pathname: string): string => {
  switch (pathname) {
    case AppRoute.Main:
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

  const isFooterNeeded = location.pathname !== AppRoute.Main && location.pathname !== AppRoute.Login && location.pathname !== AppRoute.Offer;

  const containerModifications = getContainerModifications(location.pathname);

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
