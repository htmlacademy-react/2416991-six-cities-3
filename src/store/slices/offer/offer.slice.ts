import { createSlice } from '@reduxjs/toolkit';
import { OfferState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import {
  changeFavoriteStatusAction,
  fetchNearOffersAction,
  fetchOfferAction,
} from '../../api-actions';

const initialState: OfferState = {
  offer: null,
  isOfferLoading: false,
  isOfferLoadingError: false,
  offerLoadingErrorCode: null,
  nearOffers: [],
  isNearOffersLoading: false,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    clearOfferPage: (state) => {
      state.offer = null;
      state.isOfferLoading = false;
      state.isOfferLoadingError = false;
      state.offerLoadingErrorCode = null;
      state.nearOffers = [];
      state.isNearOffersLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
        state.isOfferLoadingError = false;
        state.offerLoadingErrorCode = null;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.isOfferLoading = false;
        state.isOfferLoadingError = true;
        if (action.payload) {
          state.offerLoadingErrorCode = action.payload.status;
        }
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.isNearOffersLoading = true;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.isNearOffersLoading = false;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.nearOffers = [];
        state.isNearOffersLoading = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (state.offer?.id === action.payload.id) {
          state.offer = action.payload;
        }
      });
  },
});

export const { clearOfferPage } = offerSlice.actions;
