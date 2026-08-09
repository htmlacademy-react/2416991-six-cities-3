import { MouseEvent } from 'react';
import { Block } from '../../const/common';
import {
  AppRoute,
  AuthorizationStatus,
  FavoriteStatus,
} from '../../const/infrastructure';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { BlockName } from '../../types/common';
import { OfferPreview } from '../../types/offer';
import { Size } from './const';
import { getAuthorizationStatus } from '../../store/slices/user/user.selectors';
import { useLocation, useNavigate } from 'react-router-dom';

type BookmarkProps = {
  isActive: boolean;
  block?: BlockName;
  isSmall?: boolean;
  offerId: OfferPreview['id'];
};

const Bookmark = ({
  isActive,
  block = Block.PLACE_CARD,
  isSmall = true,
  offerId,
}: BookmarkProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const size = isSmall ? Size.SMALL : Size.BIG;

  const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login, { state: { from: location } });
    } else {
      const statusForFetching = isActive
        ? FavoriteStatus.No
        : FavoriteStatus.Yes;
      dispatch(
        changeFavoriteStatusAction({ offerId, status: statusForFetching }),
      );
    }
  };

  return (
    <button
      className={`${block}__bookmark-button ${isActive ? `${block}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={handleClick}
    >
      <svg
        className={`${block}__bookmark-icon`}
        width={size.width}
        height={size.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default Bookmark;
