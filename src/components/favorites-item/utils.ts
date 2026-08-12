import { FavoritesItemProps } from './favorites-item';

export const areFavoritesItemPropsEqual = (
  prevProps: FavoritesItemProps,
  nextProps: FavoritesItemProps,
) => {
  if (prevProps.city !== nextProps.city) {
    return false;
  }
  if (prevProps.offers.length !== nextProps.offers.length) {
    return false;
  }
  return prevProps.offers.every(
    (offer, index) => offer.id === nextProps.offers[index]?.id,
  );
};
