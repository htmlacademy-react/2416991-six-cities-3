import { createSlice } from '@reduxjs/toolkit';
import { ReviewsState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import { fetchReviewsAction, postReviewAction } from '../../api-actions';
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
      .addCase(postReviewAction.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.isPosting = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isPosting = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = [...action.payload].sort(
          (a, b) => Date.parse(b.date) - Date.parse(a.date),
        );
      })
      .addCase(clearOfferPage, (state) => {
        state.reviews = [];
      });
  },
});
