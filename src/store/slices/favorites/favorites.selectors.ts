import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/infrastructure';
import { OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';
import { Cities } from '../../../const/business';

export const getFavorites = (state: State): OfferPreview[] =>
  state[NameSpace.Favorites].favoriteOffers;

export const geIsFavoritesLoading = (state: State): boolean =>
  state[NameSpace.Favorites].isFavoritesLoading;

export const getGroupedFavorites = createSelector(
  [getFavorites],
  (favoriteOffers) =>
    Cities.map((city) => ({
      city,
      offers: favoriteOffers.filter((offer) => offer.city.name === city.name),
    })).filter(({ offers }) => offers.length > 0),
);
