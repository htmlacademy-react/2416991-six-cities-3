import { memo } from 'react';
import { Review } from '../../types/offer';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

const MemoizedReviewsList = memo(ReviewsList);

export default MemoizedReviewsList;
