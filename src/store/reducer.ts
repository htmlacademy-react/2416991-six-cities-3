import { createReducer } from '@reduxjs/toolkit';
import {
  setCurrentCity,
  loadOffers,
  setSortType,
  setAuthorizationStatus,
  setError,
  setUser,
  setOffer,
  setIsOffersLoading,
  setIsOfferLoading,
  setNearOffers,
  setIsNearOffersLoading,
  setFavorites,
  setReviews,
  setActiveOfferId,
} from './action';
import { Offer, OfferPreview, Review } from '../types/offer';
import { DefaultCity, SortOption } from '../const/business';
import { City, SortType } from '../types/common';
import { prepareOffers } from './utils';
import { AuthorizationStatus } from '../const/infrastructure';
import { AuthStatus } from '../types/infrastructure';
import { UserData } from '../types/user-data';

type InitialState = {
  currentCity: City;
  offers: OfferPreview[];
  activeOfferId: OfferPreview['id'] | null;
  isOffersLoading: boolean;
  offer: null | Offer;
  isOfferLoading: boolean;
  processedOffers: OfferPreview[];
  nearOffers: OfferPreview[];
  isNearOffersLoading: boolean;
  reviews: Review[];
  favoriteOffers: OfferPreview[];
  sortOption: SortType;
  authorizationStatus: AuthStatus;
  userInfo: null | UserData;
  error: string | null;
};

const initialState: InitialState = {
  currentCity: DefaultCity,
  offers: [],
  activeOfferId: null,
  isOffersLoading: true,
  offer: null,
  isOfferLoading: false,
  processedOffers: [],
  nearOffers: [],
  isNearOffersLoading: false,
  reviews: [],
  favoriteOffers: [],
  sortOption: SortOption.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      const currentCity = action.payload;
      state.currentCity = currentCity;
      state.processedOffers = prepareOffers(
        state.offers,
        state.favoriteOffers,
        currentCity,
        state.sortOption,
      );
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.processedOffers = prepareOffers(
        state.offers,
        state.favoriteOffers,
        state.currentCity,
        state.sortOption,
      );
    })
    .addCase(setIsOffersLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setIsOfferLoading, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setFavorites, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setIsNearOffersLoading, (state, action) => {
      state.isNearOffersLoading = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      const sortOption = action.payload;
      state.sortOption = sortOption;
      state.processedOffers = prepareOffers(
        state.offers,
        state.favoriteOffers,
        state.currentCity,
        sortOption,
      );
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
export { reducer };
