import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UserLink from '../user-link/user-link';
import { logoutAction } from '../../store/api-actions';

function UserPanel(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthorized =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Auth;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthorized && (
          <li className="header__nav-item user">
            <UserLink />
          </li>
        )}
        {isAuthorized && (
          <li className="header__nav-item">
            <a
              className="header__nav-link"
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        )}
        {!isAuthorized && (
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default UserPanel;
