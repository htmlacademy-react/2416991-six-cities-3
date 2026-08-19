import { memo } from 'react';
import { AuthorizationStatus } from '../../const/infrastructure';
import { useAppSelector } from '../../hooks';
import { Review } from '../../types/offer';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Spinner from '../spinner/spinner';
import { getAuthorizationStatus } from '../../store/slices/user/user.selectors';
import { MAX_REVIEWS_FOR_VIEW } from '../../const/business';

type OfferReviewsProps = {
  reviews: Review[];
};

const OfferReviews = memo(({ reviews }: OfferReviewsProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const preparedReviews = reviews.slice(0, MAX_REVIEWS_FOR_VIEW);
  return (
    <section className="offer__reviews reviews">
      {reviews.length > 0 && (
        <>
          <h2 className="reviews__title">
            Reviews &middot;{' '}
            <span className="reviews__amount">{reviews.length}</span>
          </h2>
          <ReviewsList reviews={preparedReviews} />
        </>
      )}

      {authorizationStatus === AuthorizationStatus.Unknown && <Spinner />}

      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
});

OfferReviews.displayName = 'OfferReviews';

export default OfferReviews;
