import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';

function LogoLink(): JSX.Element {
  const location = useLocation();
  const isMainPage = location.pathname === AppRoute.Root;

  if (isMainPage) {
    return (
      <a className="header__logo-link header__logo-link--active">
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
      </a>
    );
  }

  return (
    <Link className="header__logo-link" to={AppRoute.Root}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default LogoLink;
