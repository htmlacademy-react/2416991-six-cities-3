import { useAppSelector } from '../../hooks';
import { getGroupedFavorites } from '../../store/slices/favorites/favorites.selectors';
import FavoritesItem from '../favorites-item/favorites-item';

const FavoritesList = (): JSX.Element => {
  const groupedOffers = useAppSelector(getGroupedFavorites);

  return (
    <ul className="favorites__list">
      {groupedOffers.map(({ city, offers }) => (
        <FavoritesItem key={city.name} city={city.name} offers={offers} />
      ))}
    </ul>
  );
};

export default FavoritesList;
