import { AuthorizationStatus } from '../../const/infrastructure';
import { getAuthStatus, getReviewsById } from '../../mocks/mock';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Spinner from '../spinner/spinner';

type OfferReviewsProps = {
  id: string;
};

function OfferReviews({ id }: OfferReviewsProps): JSX.Element {
  const authorizationStatus = getAuthStatus();
  const reviews = getReviewsById(id);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviews.length === 0 && <p className="reviews__info">There are no reviews yet.</p>}
      {reviews.length > 0 && <ReviewsList reviews={reviews} />}
      {authorizationStatus === AuthorizationStatus.Unknown && <Spinner />}
      {authorizationStatus === AuthorizationStatus.NoAuth && <p className="reviews__info">Please log in to leave a review.</p>}
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default OfferReviews;
