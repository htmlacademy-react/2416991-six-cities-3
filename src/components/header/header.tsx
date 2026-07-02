import { useLocation } from 'react-router-dom';
import UserPanel from '../user-panel/user-panel';
import { AppRoute } from '../../const/infrastructure';

function Header(): JSX.Element {
  const location = useLocation();
  const isLoginPage = location.pathname === AppRoute.Login;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          {!isLoginPage && <UserPanel />}
        </div>
      </div>
    </header>
  );
}

export default Header;
