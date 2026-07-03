import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import { getAuthStatus } from '../../mocks/mock';

function UserLink(): JSX.Element {
  const isAuthorized = getAuthStatus() === AuthorizationStatus.Auth;

  if (isAuthorized) {

    return (
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        <span className="header__favorite-count">3</span>
      </Link>
    );
  }

  return (
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__login">Sign in</span>
    </Link>
  );

}

export default UserLink;
