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
} from './action';
import { Offer, OfferPreview, Review } from '../types/offer';
import { DefaultCity, SortOption } from '../const/business';
import { SortType } from '../types/common';
import { prepareOffers } from './utils';
import { AuthorizationStatus } from '../const/infrastructure';
import { AuthStatus } from '../types/infrastructure';
import { UserData } from '../types/user-data';

const initialState = {
  currentCity: DefaultCity,
  offers: [] as OfferPreview[],
  isOffersLoading: true,
  offer: null as null | Offer,
  isOfferLoading: false,
  processedOffers: [] as OfferPreview[],
  nearOffers: [] as OfferPreview[],
  isNearOffersLoading: false,
  reviews: [] as Review[],
  favoriteOffers: [] as OfferPreview[],
  sortOption: SortOption.POPULAR as SortType,
  authorizationStatus: AuthorizationStatus.Unknown as AuthStatus,
  userInfo: null as null | UserData,
  error: null as string | null,
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
