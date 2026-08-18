import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { offersSlice } from './offers.slice';
import { clearFavorites } from '../favorites/favorites.slice';
import {
  fetchOffersAction,
  changeFavoriteStatusAction,
} from '../../api-actions';
import { OfferPreview } from '../../../types/offer';

const createMockOfferPreview = (
  id?: string,
  isFavorite = false,
): OfferPreview => ({
  id: id || faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: faker.datatype.number({ min: 100, max: 500 }),
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite,
  isPremium: faker.datatype.boolean(),
  rating: 4.5,
  previewImage: faker.image.imageUrl(),
});

describe('Offers Slice Reducer', () => {
  const initialState = {
    offers: [],
    isOffersLoading: true,
    isOffersLoadingError: false,
  };

  const requestId = 'test-request-id';

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  describe('extraReducers - fetchOffersAction', () => {
    it('should set isOffersLoading to "true" and reset error on "fetchOffersAction.pending"', () => {
      const stateWithError = {
        offers: [],
        isOffersLoading: false,
        isOffersLoadingError: true,
      };

      const action = fetchOffersAction.pending(requestId, undefined);
      const result = offersSlice.reducer(stateWithError, action);

      expect(result.isOffersLoading).toBe(true);
      expect(result.isOffersLoadingError).toBe(false);
    });

    it('should set offers and set isOffersLoading to "false" on "fetchOffersAction.fulfilled"', () => {
      const mockOffers = [createMockOfferPreview(), createMockOfferPreview()];

      const action = fetchOffersAction.fulfilled(
        mockOffers,
        requestId,
        undefined,
      );
      const result = offersSlice.reducer(initialState, action);

      expect(result.offers).toEqual(mockOffers);
      expect(result.isOffersLoading).toBe(false);
      expect(result.isOffersLoadingError).toBe(false);
    });

    it('should reset offers to [], set isOffersLoading to "false" and isOffersLoadingError to "true" on "fetchOffersAction.rejected"', () => {
      const stateWithExistingOffers = {
        offers: [createMockOfferPreview()],
        isOffersLoading: true,
        isOffersLoadingError: false,
      };

      const action = fetchOffersAction.rejected(null, requestId, undefined);
      const result = offersSlice.reducer(stateWithExistingOffers, action);

      expect(result.offers).toEqual([]);
      expect(result.isOffersLoading).toBe(false);
      expect(result.isOffersLoadingError).toBe(true);
    });
  });

  describe('extraReducers - changeFavoriteStatusAction & clearFavorites', () => {
    it('should update isFavorite status for target offer on "changeFavoriteStatusAction.fulfilled"', () => {
      const targetId = 'target-offer-id';
      const offerToUpdate = createMockOfferPreview(targetId, false);
      const otherOffer = createMockOfferPreview('other-offer-id', false);

      const stateWithOffers = {
        ...initialState,
        offers: [offerToUpdate, otherOffer],
      };

      const updatedOfferFromApi = { ...offerToUpdate, isFavorite: true };

      type ChangeFavoriteArg = Parameters<
        typeof changeFavoriteStatusAction.fulfilled
      >[2];
      const actionArg = { offerId: targetId, status: 1 } as ChangeFavoriteArg;

      const action = changeFavoriteStatusAction.fulfilled(
        updatedOfferFromApi,
        requestId,
        actionArg,
      );

      const result = offersSlice.reducer(stateWithOffers, action);

      expect(result.offers[0].isFavorite).toBe(true);
      expect(result.offers[1].isFavorite).toBe(false);
    });

    it('should set isFavorite to "false" for all offers on "clearFavorites"', () => {
      const stateWithFavorites = {
        ...initialState,
        offers: [
          createMockOfferPreview('id-1', true),
          createMockOfferPreview('id-2', true),
        ],
      };

      const result = offersSlice.reducer(stateWithFavorites, clearFavorites());

      expect(result.offers.every((offer) => offer.isFavorite === false)).toBe(
        true,
      );
    });
  });
});
