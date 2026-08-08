import { createSlice } from '@reduxjs/toolkit';
import { ReviewsState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import { fetchReviews } from '../../api-actions';
import { clearOfferPage } from '../offer/offer.slice';

const initialState: ReviewsState = {
  reviews: [],
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(clearOfferPage, (state) => {
        state.reviews = [];
      });
  },
});

export const { clearReviews } = reviewsSlice.actions;
