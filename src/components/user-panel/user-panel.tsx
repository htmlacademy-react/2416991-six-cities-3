import { AuthorizationStatus } from '../../const/infrastructure';
import { getAuthStatus } from '../../mocks/mock';
import UserLink from '../user-link/user-link';

function UserPanel(): JSX.Element {
  const isAuthorized = getAuthStatus() === AuthorizationStatus.Auth;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <UserLink />
        </li>
        {isAuthorized &&
          <li className="header__nav-item">
            <a className="header__nav-link" href="#">
              <span className="header__signout">Sign out</span>
            </a>
          </li>}
      </ul>
    </nav>
  );
}

export default UserPanel;
