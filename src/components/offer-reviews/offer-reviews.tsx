import { memo } from 'react';
import { AuthorizationStatus } from '../../const/infrastructure';
import { useAppSelector } from '../../hooks';
import { Review } from '../../types/offer';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Spinner from '../spinner/spinner';

type OfferReviewsProps = {
  reviews: Review[];
};

function OfferReviews({ reviews }: OfferReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  return (
    <section className="offer__reviews reviews">
      {reviews.length > 0 && (
        <>
          <h2 className="reviews__title">
            Reviews &middot;{' '}
            <span className="reviews__amount">{reviews.length}</span>
          </h2>
          <ReviewsList reviews={reviews} />
        </>
      )}

      {authorizationStatus === AuthorizationStatus.Unknown && <Spinner />}

      {authorizationStatus === AuthorizationStatus.Auth && (
        <ReviewForm />
      )}
    </section>
  );
}

const MemoizedOfferReviews = memo(OfferReviews);

export default MemoizedOfferReviews;
