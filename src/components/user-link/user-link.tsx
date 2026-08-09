import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';
import { useAppSelector } from '../../hooks';
import './user-link.css';
import { getUserInfo } from '../../store/slices/user/user.selectors';
import { getFavorites } from '../../store/slices/favorites/favorites.selectors';

const UserLink = (): JSX.Element => {
  const user = useAppSelector(getUserInfo);
  const favoriteOffersCount = useAppSelector(getFavorites).length;
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
};

export default UserLink;
