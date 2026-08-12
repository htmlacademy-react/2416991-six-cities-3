import { createSlice } from '@reduxjs/toolkit';
import { OffersState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import {
  changeFavoriteStatusAction,
  fetchOffersAction,
} from '../../api-actions';
import { clearFavorites } from '../favorites/favorites.slice';

const initialState: OffersState = {
  offers: [],
  isOffersLoading: true,
  isOffersLoadingError: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.isOffersLoadingError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        state.isOffersLoading = false;
        state.isOffersLoadingError = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const index = state.offers.findIndex(
          (offer) => offer.id === updatedOffer.id,
        );
        if (index !== -1) {
          state.offers[index].isFavorite = updatedOffer.isFavorite;
        }
      })
      .addCase(clearFavorites, (state) => {
        state.offers.forEach((offer) => {
          offer.isFavorite = false;
        });
      });
  },
});
