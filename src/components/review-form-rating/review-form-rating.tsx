import { memo } from 'react';
import { Rating } from '../../const/business';
import { RatingInForm } from '../../types/offer';
import ReviewFormRatingStar from '../review-form-rating-star/review-form-rating-star';

type ReviewFormRatingProps = {
  rating: RatingInForm;
  disabled: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const RATINGS = Object.keys(Rating).reverse();

const ReviewFormRating = memo(
  ({ rating, disabled, onChange }: ReviewFormRatingProps): JSX.Element => (
    <div className="reviews__rating-form form__rating">
      {RATINGS.map((value) => (
        <ReviewFormRatingStar
          key={value}
          value={value}
          title={Rating[Number(value) as keyof typeof Rating]}
          checked={Number(value) === rating}
          onChange={onChange}
          disabled={disabled}
        />
      ))}
    </div>
  ),
);

ReviewFormRating.displayName = 'ReviewFormRating';

export default ReviewFormRating;
