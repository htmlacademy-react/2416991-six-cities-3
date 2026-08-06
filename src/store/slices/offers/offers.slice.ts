import { createSlice } from '@reduxjs/toolkit';
import { OffersState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import { fetchOffersAction } from '../../api-actions';

const initialState: OffersState = {
  offers: [],
  isOffersLoading: false,
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
        state.isOffersLoadingError = true;
      });
  },
});
