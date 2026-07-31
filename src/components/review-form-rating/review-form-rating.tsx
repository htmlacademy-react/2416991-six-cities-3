import { Rating } from '../../const/business';
import { RatingInForm } from '../../types/offer';
import ReviewFormRatingStar from '../review-form-rating-star/review-form-rating-star';

type ReviewFormRatingProps = {
  rating: RatingInForm;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

function ReviewFormRating({
  rating,
  onChange,
}: ReviewFormRatingProps): JSX.Element {
  const ratings = Object.keys(Rating).reverse();
  return (
    <div className="reviews__rating-form form__rating">
      {ratings.map((value) => (
        <ReviewFormRatingStar
          key={value}
          value={value}
          title={Rating[Number(value) as keyof typeof Rating]}
          checked={Number(value) === rating}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default ReviewFormRating;
