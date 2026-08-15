import { createSlice } from '@reduxjs/toolkit';
import { ReviewsState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import { fetchReviews, postReview } from '../../api-actions';
import { clearOfferPage } from '../offer/offer.slice';

const initialState: ReviewsState = {
  reviews: [],
  isPosting: false,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postReview.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.isPosting = false;
      })
      .addCase(postReview.rejected, (state) => {
        state.isPosting = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = [...action.payload].sort(
          (a, b) => Date.parse(b.date) - Date.parse(a.date),
        );
      })
      .addCase(clearOfferPage, (state) => {
        state.reviews = [];
      });
  },
});
