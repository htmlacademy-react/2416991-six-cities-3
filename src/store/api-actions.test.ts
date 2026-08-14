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
import { Offer, OfferPreview, Review, ServerOffer } from '../types/offer';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mocks';
import { Action } from 'redux';

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

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({ api: axios })];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
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

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
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

    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected" when server response 404', async () => {
      const offerId = 'non-existent-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(404);

      await store.dispatch(fetchOfferAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearOffersAction', () => {
    it('should dispatch "fetchNearOffersAction.pending" and "fetchNearOffersAction.fulfilled" when server response 200', async () => {
      const mockNearOffers = [makeFakeOfferPreview(), makeFakeOfferPreview()];
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

      expect(fetchNearOffersActionFulfilled.payload).toEqual(mockNearOffers);
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
    it('should dispatch "postReview.pending", "fetchReviews.pending" and "postReview.fulfilled" when server response 200', async () => {
      const reviewData = { id: 'test-offer-id', comment: 'Great place!', rating: 5 };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${reviewData.id}`).reply(200);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${reviewData.id}`).reply(200, []);

      await store.dispatch(postReview(reviewData));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        fetchReviews.pending.type,
        postReview.fulfilled.type,
      ]);
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
    it('should dispatch "changeFavoriteStatusAction.pending", "fetchFavoritesAction.pending" and "changeFavoriteStatusAction.fulfilled" when server response 200', async () => {
      const mockServerOffer = makeFakeServerOffer();
      const mockAdaptedOffer = makeFakeOffer();
      const payload = { offerId: mockServerOffer.id, status: FavoriteStatus.Yes };

      vi.spyOn(utils, 'adaptOffer').mockReturnValue(mockAdaptedOffer);
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${payload.offerId}/${payload.status}`).reply(200, mockServerOffer);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);

      await store.dispatch(changeFavoriteStatusAction(payload));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        fetchFavoritesAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
    });
  });
});
