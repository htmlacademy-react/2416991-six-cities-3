import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { offerSlice, clearOfferPage } from './offer.slice';
import { clearFavorites } from '../favorites/favorites.slice';
import {
  fetchOfferAction,
  fetchNearOffersAction,
  changeFavoriteStatusAction,
} from '../../api-actions';
import { Offer, OfferPreview } from '../../../types/offer';
import { Cities } from '../../../const/business';

const createMockOffer = (id?: string, isFavorite = false): Offer => ({
  id: id || faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: faker.datatype.number({ min: 100, max: 500 }),
  city: {
    name: Cities[0].name,
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite,
  isPremium: faker.datatype.boolean(),
  rating: 4.5,
  description: faker.lorem.paragraph(),
  bedroomsQuantity: 2,
  goods: ['Heating', 'Wi-Fi'],
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: true,
  },
  images: [faker.image.imageUrl()],
  maxAdults: 3,
});

const createMockOfferPreview = (id?: string, isFavorite = false): OfferPreview => ({
  id: id || faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'room',
  price: 100,
  city: {
    name: Cities[0].name,
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite,
  isPremium: false,
  rating: 4.0,
  previewImage: faker.image.imageUrl(),
});

describe('Offer Slice Reducer', () => {
  const initialState = {
    offer: null,
    isOfferLoading: false,
    isOfferLoadingError: false,
    offerLoadingErrorCode: null,
    nearOffers: [],
    isNearOffersLoading: false,
  };

  const requestId = 'test-request-id';
  const offerId = 'test-offer-id-100';

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should reset offer page state with "clearOfferPage" action', () => {
      const modifiedState = {
        offer: createMockOffer(),
        isOfferLoading: true,
        isOfferLoadingError: true,
        offerLoadingErrorCode: 404,
        nearOffers: [createMockOfferPreview()],
        isNearOffersLoading: true,
      };

      const result = offerSlice.reducer(modifiedState, clearOfferPage());

      expect(result).toEqual(initialState);
    });
  });

  describe('extraReducers - fetchOfferAction', () => {
    it('should set isOfferLoading to "true" and reset errors on "fetchOfferAction.pending"', () => {
      const stateWithError = {
        ...initialState,
        isOfferLoadingError: true,
        offerLoadingErrorCode: 404,
      };

      const action = fetchOfferAction.pending(requestId, offerId);
      const result = offerSlice.reducer(stateWithError, action);

      expect(result.isOfferLoading).toBe(true);
      expect(result.isOfferLoadingError).toBe(false);
      expect(result.offerLoadingErrorCode).toBeNull();
    });

    it('should set offer and set isOfferLoading to "false" on "fetchOfferAction.fulfilled"', () => {
      const mockOffer = createMockOffer(offerId);

      const action = fetchOfferAction.fulfilled(mockOffer, requestId, offerId);
      const result = offerSlice.reducer(initialState, action);

      expect(result.offer).toEqual(mockOffer);
      expect(result.isOfferLoading).toBe(false);
    });

    it('should set error state and status code on "fetchOfferAction.rejected"', () => {
      const errorPayload = { status: 404, message: 'Not Found' };

      const action = fetchOfferAction.rejected(null, requestId, offerId, errorPayload);
      const result = offerSlice.reducer(initialState, action);

      expect(result.isOfferLoading).toBe(false);
      expect(result.isOfferLoadingError).toBe(true);
      expect(result.offerLoadingErrorCode).toBe(404);
    });
  });

  describe('extraReducers - fetchNearOffersAction', () => {
    it('should set isNearOffersLoading to "true" on "fetchNearOffersAction.pending"', () => {
      const action = fetchNearOffersAction.pending(requestId, offerId);
      const result = offerSlice.reducer(initialState, action);

      expect(result.isNearOffersLoading).toBe(true);
    });

    it('should update nearOffers on "fetchNearOffersAction.fulfilled"', () => {
      const mockNearOffers = [createMockOfferPreview(), createMockOfferPreview()];

      const action = fetchNearOffersAction.fulfilled(mockNearOffers, requestId, offerId);
      const result = offerSlice.reducer(initialState, action);

      expect(result.nearOffers).toEqual(mockNearOffers);
      expect(result.isNearOffersLoading).toBe(false);
    });

    it('should reset nearOffers to [] on "fetchNearOffersAction.rejected"', () => {
      const stateWithNearOffers = {
        ...initialState,
        nearOffers: [createMockOfferPreview()],
        isNearOffersLoading: true,
      };

      const action = fetchNearOffersAction.rejected(null, requestId, offerId);
      const result = offerSlice.reducer(stateWithNearOffers, action);

      expect(result.nearOffers).toEqual([]);
      expect(result.isNearOffersLoading).toBe(false);
    });
  });

  describe('extraReducers - changeFavoriteStatusAction & clearFavorites', () => {
    it('should update isFavorite in current offer and nearOffers on "changeFavoriteStatusAction.fulfilled"', () => {
      const targetId = 'target-offer-id';
      const currentOffer = createMockOffer(targetId, false);
      const nearOfferMatching = createMockOfferPreview(targetId, false);
      const nearOfferOther = createMockOfferPreview('other-id', false);

      const stateWithOffers = {
        ...initialState,
        offer: currentOffer,
        nearOffers: [nearOfferMatching, nearOfferOther],
      };

      const updatedOfferFromApi = { ...currentOffer, isFavorite: true };

      const action = changeFavoriteStatusAction.fulfilled(
        updatedOfferFromApi,
        requestId,
        { offerId: targetId, status: 1 },
      );

      const result = offerSlice.reducer(stateWithOffers, action);

      expect(result.offer?.isFavorite).toBe(true);
      expect(result.nearOffers[0].isFavorite).toBe(true);
      expect(result.nearOffers[1].isFavorite).toBe(false);
    });

    it('should set isFavorite to "false" for offer and all nearOffers on "clearFavorites"', () => {
      const stateWithFavorites = {
        ...initialState,
        offer: createMockOffer('id-1', true),
        nearOffers: [
          createMockOfferPreview('id-2', true),
          createMockOfferPreview('id-3', true),
        ],
      };

      const result = offerSlice.reducer(stateWithFavorites, clearFavorites());

      expect(result.offer?.isFavorite).toBe(false);
      expect(result.nearOffers.every((offer) => offer.isFavorite === false)).toBe(true);
    });
  });
});
