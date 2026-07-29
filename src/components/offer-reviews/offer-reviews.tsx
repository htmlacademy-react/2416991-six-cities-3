import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const/infrastructure';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Spinner from '../spinner/spinner';
import { fetchReviews } from '../../store/api-actions';

type OfferReviewsProps = Pick<Offer, 'id'>;

function OfferReviews({ id }: OfferReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [id, dispatch]);

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

      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default OfferReviews;
