import { memo } from 'react';
import ReviewFormRating from '../review-form-rating/review-form-rating';
import { MIN_REVIEW_CHARACTERS } from './const';
import { useReviewForm } from '../../hooks/use-review-form';

function ReviewForm(): JSX.Element {
  const {
    formData,
    isValid,
    isSubmitting,
    handleRatingChange,
    handleTextChange,
    handleSubmit,
  } = useReviewForm();

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <ReviewFormRating
        rating={formData.rating}
        onChange={handleRatingChange}
        disabled={isSubmitting}
      />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleTextChange}
        disabled={isSubmitting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_REVIEW_CHARACTERS} characters
          </b>
          .
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

const MemoizedReviewForm = memo(ReviewForm);

export default MemoizedReviewForm;
