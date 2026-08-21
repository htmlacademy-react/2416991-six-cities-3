import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ReviewsList from './reviews-list';
import { makeFakeReview } from '../../utils/mocks';

vi.mock('../review-item/review-item', () => ({
  default: ({ review }: { review: { id: string } }) => (
    <li data-testid="review-item">{review.id}</li>
  ),
}));

describe('Component: ReviewsList', () => {
  it('should render all reviews', () => {
    const reviews = [
      makeFakeReview('review-1'),
      makeFakeReview('review-2'),
      makeFakeReview('review-3'),
    ];

    render(<ReviewsList reviews={reviews} />);

    const reviewItems = screen.getAllByTestId('review-item');

    expect(reviewItems).toHaveLength(reviews.length);

    expect(reviewItems[0]).toHaveTextContent('review-1');
    expect(reviewItems[1]).toHaveTextContent('review-2');
    expect(reviewItems[2]).toHaveTextContent('review-3');
  });

  it('should render empty list when there are no reviews', () => {
    render(<ReviewsList reviews={[]} />);

    expect(screen.queryByTestId('review-item')).not.toBeInTheDocument();
  });
});
