import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';
import { useAppSelector } from '../../hooks';
import './user-link.css';

function UserLink(): JSX.Element {
  const user = useAppSelector((state) => state.userInfo);
  const favoriteOffersCount = useAppSelector(
    (state) => state.favoriteOffers.length,
  );
  return (
    <Link
      className="header__nav-link header__nav-link--profile"
      to={AppRoute.Favorites}
    >
      <div
        className={`header__avatar-wrapper user__avatar-wrapper ${user?.isPro ? 'user__avatar-wrapper--pro' : ''}`}
      >
        <img className="user__avatar-image" src={user?.avatarUrl} />
      </div>
      <span className="header__user-name user__name">
        {user?.name || user?.email || 'John Doe'}
      </span>
      <span className="header__favorite-count">{favoriteOffersCount}</span>
    </Link>
  );
}

export default UserLink;
