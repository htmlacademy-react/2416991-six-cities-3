import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import faker from 'faker';
import { createAPI } from '../services/api';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearOffersAction,
  fetchReviews,
  postReview,
  fetchFavoritesAction,
  changeFavoriteStatusAction,
} from './api-actions';
import { APIRoute, FavoriteStatus } from '../const/infrastructure';
import { State } from '../types/state';
import * as utils from './utils';
import { Offer, OfferPreview, Review, ServerFavoriteResponse, ServerOffer } from '../types/offer';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mocks';
import { Action } from 'redux';
import { MAX_NEAR_OFFERS_COUNT } from '../const/business';

const makeFakeOfferPreview = (): OfferPreview => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: faker.datatype.number({ min: 100, max: 500 }),
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: 4.5,
  previewImage: faker.image.imageUrl(),
});

const makeFakeServerOffer = (): ServerOffer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: 200,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  description: faker.lorem.paragraph(),
  images: [faker.image.imageUrl()],
  goods: ['Wi-Fi'],
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: true,
  },
  bedrooms: 2,
  maxAdults: 3,
});

const makeFakeOffer = (): Offer => ({
  ...makeFakeServerOffer(),
  bedroomsQuantity: 2,
});

const makeFakeReview = (): Review => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  user: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: true,
  },
  comment: faker.lorem.paragraph(),
  rating: 5,
});

const makeFakeServerFavoriteResponse = (): ServerFavoriteResponse => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: 200,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  description: faker.lorem.paragraph(),
  images: [faker.image.imageUrl()],
  goods: ['Wi-Fi'],
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: true,
  },
  bedrooms: 2,
  maxAdults: 3,
});

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({ api: axios })];
  const mockStoreCreator = configureMockStore<Partial<State>, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
    mockAxiosAdapter.reset();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOfferPreview(), makeFakeOfferPreview()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" with CustomServerError when server response 400', async () => {
      const mockErrorResponse = { message: 'Bad request' };
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, mockErrorResponse);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionRejected = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.rejected>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);

      expect(fetchOffersActionRejected.payload).toEqual({
        status: 400,
        message: mockErrorResponse.message,
      });
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server response 200', async () => {
      const mockServerOffer = makeFakeServerOffer();
      const mockAdaptedOffer = makeFakeOffer();
      const offerId = mockServerOffer.id;

      vi.spyOn(utils, 'adaptOffer').mockReturnValue(mockAdaptedOffer);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, mockServerOffer);

      await store.dispatch(fetchOfferAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockAdaptedOffer);
    });

    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected" with CustomServerError when server response 404', async () => {
      const offerId = 'non-existent-id';
      const mockErrorResponse = {
        errorType: 'COMMON_ERROR',
        message: `Offer with id ${offerId} not found.`,
        details: [],
      };

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(404, mockErrorResponse);

      await store.dispatch(fetchOfferAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionRejected = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.rejected>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);

      expect(fetchOfferActionRejected.payload).toEqual({
        status: 404,
        message: mockErrorResponse.message,
      });
    });
  });

  describe('fetchNearOffersAction', () => {
    it('should dispatch "fetchNearOffersAction.pending" and "fetchNearOffersAction.fulfilled" with sliced offers when server response 200', async () => {
      const mockNearOffers = Array.from({ length: MAX_NEAR_OFFERS_COUNT + 2 }, () => makeFakeOfferPreview());
      const expectedOffers = mockNearOffers.slice(0, MAX_NEAR_OFFERS_COUNT);
      const offerId = 'test-offer-id';

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`).reply(200, mockNearOffers);

      await store.dispatch(fetchNearOffersAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearOffersAction.pending.type,
        fetchNearOffersAction.fulfilled.type,
      ]);

      expect(fetchNearOffersActionFulfilled.payload).toEqual(expectedOffers);
    });
  });

  describe('fetchReviews', () => {
    it('should dispatch "fetchReviews.pending" and "fetchReviews.fulfilled" when server response 200', async () => {
      const mockReviews = [makeFakeReview(), makeFakeReview()];
      const offerId = 'test-offer-id';

      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);

      expect(fetchReviewsFulfilled.payload).toEqual(mockReviews);
    });
  });

  describe('postReview', () => {
    it('should dispatch "postReview.pending" and "postReview.fulfilled" when server response 200', async () => {
      const mockReview = makeFakeReview();
      const reviewData = { id: 'test-offer-id', comment: 'Great place!', rating: 5 };

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${reviewData.id}`).reply(200, mockReview);

      await store.dispatch(postReview(reviewData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postReviewFulfilled = emittedActions.at(1) as ReturnType<typeof postReview.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type,
      ]);

      expect(postReviewFulfilled.payload).toEqual(mockReview);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server response 200', async () => {
      const mockFavorites = [makeFakeOfferPreview()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockFavorites);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch "changeFavoriteStatusAction.pending" and "changeFavoriteStatusAction.fulfilled" when server response 200', async () => {
      const mockServerFavoriteResponse = makeFakeServerFavoriteResponse();
      const mockOfferPreview = makeFakeOfferPreview();
      const payload = { offerId: mockOfferPreview.id, status: FavoriteStatus.Yes };

      const mockAdaptedPreviewOffer = { ...mockOfferPreview, isFavorite: true };

      store = mockStoreCreator({
        OFFERS: {
          offers: [mockOfferPreview],
        },
      } as unknown as Partial<State>);

      vi.spyOn(utils, 'adaptFavoriteResponseToPreview').mockReturnValue(mockAdaptedPreviewOffer);
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${payload.offerId}/${payload.status}`)
        .reply(200, mockServerFavoriteResponse);

      await store.dispatch(changeFavoriteStatusAction(payload));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteStatusActionFulfilled = emittedActions.at(1) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);

      expect(changeFavoriteStatusActionFulfilled.payload).toEqual({
        ...mockOfferPreview,
        ...mockAdaptedPreviewOffer,
      });
    });
  });
});
