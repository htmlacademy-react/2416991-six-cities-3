import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';
import LogoLink from '../logo-link/logo-link';
import UserPanel from '../user-panel/user-panel';
import { memo } from 'react';

const Header = memo((): JSX.Element => {
  const location = useLocation();
  const isLoginPage = location.pathname === AppRoute.Login;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoLink />
          </div>
          {!isLoginPage && <UserPanel />}
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
