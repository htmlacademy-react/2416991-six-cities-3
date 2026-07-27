import { createReducer } from '@reduxjs/toolkit';
import {
  setCurrentCity,
  loadOffers,
  setSortType,
  setAuthorizationStatus,
  setIsLoading,
} from './action';
import { OfferPreview } from '../types/offer';
import { DefaultCity, SortOption } from '../const/business';
import { SortType } from '../types/common';
import { filterAndSortOffers } from './utils';
import { AuthorizationStatus } from '../const/infrastructure';
import { AuthStatus } from '../types/infrastructure';

const initialState = {
  currentCity: DefaultCity,
  processedOffers: [] as OfferPreview[],
  offers: [] as OfferPreview[],
  sortOption: SortOption.POPULAR as SortType,
  authorizationStatus: AuthorizationStatus.Unknown as AuthStatus,
  isOffersLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      const currentCity = action.payload;
      state.currentCity = currentCity;
      state.processedOffers = filterAndSortOffers(
        state.offers,
        currentCity,
        state.sortOption,
      );
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.processedOffers = filterAndSortOffers(
        state.offers,
        state.currentCity,
        state.sortOption,
      );
    })
    .addCase(setSortType, (state, action) => {
      const sortOption = action.payload;
      state.sortOption = sortOption;
      state.processedOffers = filterAndSortOffers(
        state.offers,
        state.currentCity,
        sortOption,
      );
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setIsLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
export { reducer };
