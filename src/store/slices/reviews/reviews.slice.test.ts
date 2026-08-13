import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { reviewsSlice } from './reviews.slice';
import { clearOfferPage } from '../offer/offer.slice';
import { fetchReviews } from '../../api-actions';
import { Review } from '../../../types/offer';

const createMockReview = (id?: string): Review => ({
  id: id || faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
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
  };

  const requestId = 'test-request-id';
  const offerId = 'test-offer-id';

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  describe('extraReducers - fetchReviews', () => {
    it('should set reviews on "fetchReviews.fulfilled"', () => {
      const mockReviews = [createMockReview(), createMockReview()];

      type FetchReviewsArg = Parameters<typeof fetchReviews.fulfilled>[2];
      const actionArg = offerId as FetchReviewsArg;

      const action = fetchReviews.fulfilled(mockReviews, requestId, actionArg);
      const result = reviewsSlice.reducer(initialState, action);

      expect(result.reviews).toEqual(mockReviews);
    });
  });

  describe('extraReducers - clearOfferPage', () => {
    it('should reset reviews to [] on "clearOfferPage"', () => {
      const stateWithReviews = {
        reviews: [createMockReview(), createMockReview()],
      };

      const result = reviewsSlice.reducer(stateWithReviews, clearOfferPage());

      expect(result.reviews).toEqual([]);
    });
  });
});
