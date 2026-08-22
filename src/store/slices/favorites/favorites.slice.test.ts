import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { favoritesSlice, clearFavorites } from './favorites.slice';
import {
  changeFavoriteStatusAction,
  fetchFavoritesAction,
} from '../../api-actions';
import { OfferPreview } from '../../../types/offer';
import { Cities } from '../../../const/business';
import { FavoriteStatus } from '../../../const/infrastructure';

const createMockOffer = (): OfferPreview => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: faker.datatype.number({ min: 100, max: 500 }),
  city: {
    name: Cities[0].name,
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: true,
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
  previewImage: faker.image.imageUrl(),
});

describe('Favorites Slice Reducer', () => {
  const initialState = {
    favoriteOffers: [],
    isFavoritesLoading: true,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should clear favorites and stop loading with "clearFavorites" action', () => {
      const stateWithFavorites = {
        favoriteOffers: [createMockOffer()],
        isFavoritesLoading: true,
      };

      const result = favoritesSlice.reducer(
        stateWithFavorites,
        clearFavorites(),
      );

      expect(result.favoriteOffers).toEqual([]);
      expect(result.isFavoritesLoading).toBe(false);
    });
  });

  describe('extraReducers (fetchFavoritesAction)', () => {
    const requestId = 'test-request-id';

    it('should set isFavoritesLoading to "true" on "fetchFavoritesAction.pending"', () => {
      const stateWithFalseLoading = {
        ...initialState,
        isFavoritesLoading: false,
      };

      const action = fetchFavoritesAction.pending(requestId, undefined);

      const result = favoritesSlice.reducer(stateWithFalseLoading, action);

      expect(result.isFavoritesLoading).toBe(true);
    });

    it('should update favoriteOffers and set isFavoritesLoading to "false" on "fetchFavoritesAction.fulfilled"', () => {
      const mockOffers = [createMockOffer(), createMockOffer()];

      const action = fetchFavoritesAction.fulfilled(
        mockOffers,
        requestId,
        undefined,
      );

      const result = favoritesSlice.reducer(initialState, action);

      expect(result.favoriteOffers).toEqual(mockOffers);
      expect(result.isFavoritesLoading).toBe(false);
    });

    it('should set isFavoritesLoading to "false" on "fetchFavoritesAction.rejected"', () => {
      const stateWithTrueLoading = {
        ...initialState,
        isFavoritesLoading: true,
      };

      const action = fetchFavoritesAction.rejected(null, requestId, undefined);

      const result = favoritesSlice.reducer(stateWithTrueLoading, action);

      expect(result.isFavoritesLoading).toBe(false);
    });
  });

  describe('extraReducers (changeFavoriteStatusAction)', () => {
    const requestId = 'test-request-id';

    it('should add offer to favorites when isFavorite is true', () => {
      const offer = createMockOffer();

      const action = changeFavoriteStatusAction.fulfilled(offer, requestId, {
        offerId: offer.id,
        status: FavoriteStatus.Yes,
      });

      const result = favoritesSlice.reducer(initialState, action);

      expect(result.favoriteOffers).toEqual([offer]);
    });

    it('should remove offer from favorites when isFavorite is false', () => {
      const offer = createMockOffer();

      const stateWithFavorites = {
        favoriteOffers: [offer],
        isFavoritesLoading: false,
      };

      const updatedOffer = {
        ...offer,
        isFavorite: false,
      };

      const action = changeFavoriteStatusAction.fulfilled(
        updatedOffer,
        requestId,
        {
          offerId: offer.id,
          status: FavoriteStatus.No,
        },
      );

      const result = favoritesSlice.reducer(stateWithFavorites, action);

      expect(result.favoriteOffers).toEqual([]);
    });
  });
});
