import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { reviewsSlice } from './reviews.slice';
import { clearOfferPage } from '../offer/offer.slice';
import { fetchReviewsAction, postReviewAction } from '../../api-actions';
import { Review } from '../../../types/offer';

const createMockReview = (id?: string, date?: string): Review => ({
  id: id || faker.datatype.uuid(),
  date: date || faker.date.recent().toISOString(),
  user: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

describe('Reviews Slice Reducer', () => {
  const initialState = {
    reviews: [],
    isPosting: false,
  };

  const requestId = 'test-request-id';
  const offerId = 'test-offer-id';

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  describe('extraReducers - fetchReviews', () => {
    it('should set sorted reviews (newest first) on "fetchReviews.fulfilled"', () => {
      const olderReview = createMockReview('1', '2023-01-01T10:00:00.000Z');
      const newerReview = createMockReview('2', '2023-06-01T10:00:00.000Z');

      const mockUnsortedReviews = [olderReview, newerReview];

      const action = fetchReviewsAction.fulfilled(mockUnsortedReviews, requestId, offerId);
      const result = reviewsSlice.reducer(initialState, action);

      expect(result.reviews).toEqual([newerReview, olderReview]);
    });
  });

  describe('extraReducers - postReviewAction', () => {
    const postReviewPayload = { id: offerId, comment: 'Great place!', rating: 5 };

    it('should set "isPosting" to true on "postReviewAction.pending"', () => {
      const action = postReviewAction.pending(requestId, postReviewPayload);
      const result = reviewsSlice.reducer(initialState, action);

      expect(result.isPosting).toBe(true);
    });

    it('should prepend new review and set "isPosting" to false on "postReviewAction.fulfilled"', () => {
      const existingReview = createMockReview('existing-id');
      const newReview = createMockReview('new-id');

      const stateWithReview = {
        reviews: [existingReview],
        isPosting: true,
      };

      const action = postReviewAction.fulfilled(newReview, requestId, postReviewPayload);
      const result = reviewsSlice.reducer(stateWithReview, action);

      expect(result.reviews).toEqual([newReview, existingReview]);
      expect(result.isPosting).toBe(false);
    });

    it('should set "isPosting" to false on "postReviewAction.rejected"', () => {
      const statePosting = {
        reviews: [],
        isPosting: true,
      };

      const action = postReviewAction.rejected(null, requestId, postReviewPayload);
      const result = reviewsSlice.reducer(statePosting, action);

      expect(result.isPosting).toBe(false);
    });
  });

  describe('extraReducers - clearOfferPage', () => {
    it('should reset reviews to [] on "clearOfferPage"', () => {
      const stateWithReviews = {
        reviews: [createMockReview(), createMockReview()],
        isPosting: false,
      };

      const result = reviewsSlice.reducer(stateWithReviews, clearOfferPage());

      expect(result.reviews).toEqual([]);
    });
  });
});
