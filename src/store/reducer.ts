import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCity, loadOffers, setSortType } from './action';
import { OfferPreview } from '../types/offer';
import { DefaultCity, SortOption } from '../const/business';
import { City, SortType } from '../types/common';
import { filterAndSortOffers } from './utils';

type State = {
  currentCity: City;
  processedOffers: OfferPreview[];
  offers: OfferPreview[];
  sortOption: SortType;
};

const initialState: State = {
  currentCity: DefaultCity,
  processedOffers: [],
  offers: [],
  sortOption: SortOption.POPULAR,
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
    });
});

export { reducer };
