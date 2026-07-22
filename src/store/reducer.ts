import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCity, loadOffers } from './action';
import { OfferPreview } from '../types/offer';
import { DefaultCity } from '../const/business';
import { City } from '../types/common';

type State = {
  currentCity: City;
  offersByCity: OfferPreview[];
  offers: OfferPreview[];
};

const initialState: State = {
  currentCity: DefaultCity,
  offersByCity: [],
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      const currentCity = action.payload;
      state.currentCity = currentCity;
      state.offersByCity = [...state.offers].filter((offer) => offer.city.name === currentCity.name);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.offersByCity = [...state.offers].filter((offer) => offer.city.name === state.currentCity.name);
    });
});

export { reducer };
