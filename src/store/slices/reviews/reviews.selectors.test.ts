import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { NameSpace } from '../../../const/infrastructure';
import { Review } from '../../../types/offer';
import { getReviews, getIsReviewPosting } from './reviews.selectors';

const createMockReview = (): Review => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  user: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

describe('Reviews selectors', () => {
  const mockReviews = [createMockReview(), createMockReview()];

  const state = {
    [NameSpace.Reviews]: {
      reviews: mockReviews,
      isPosting: true,
    },
  };

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return isPosting status from state', () => {
    const { isPosting } = state[NameSpace.Reviews];
    const result = getIsReviewPosting(state);
    expect(result).toBe(isPosting);
  });
});
