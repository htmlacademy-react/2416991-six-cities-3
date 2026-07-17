import { useState } from 'react';
import ReviewFormRating from '../review-form-rating/review-form-rating';
import { ReviewFormData, ReviewRating } from './types';
import { validateReviewForm } from './utils';

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState<ReviewFormData>({
    review: '',
    rating: '',
  });

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        // eslint-disable-next-line
        console.log(formData);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewFormRating rating={formData.rating} onChange={(evt) => setFormData({ ...formData, rating: evt.target.value as ReviewRating })} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={(evt) => setFormData({ ...formData, review: evt.target.value })}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!validateReviewForm(formData)}>
          Submit review
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
