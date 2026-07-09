import { useState } from 'react';
import ReviewFormRating from '../review-form-rating/review-form-rating';
import { RatingInForm } from '../../types/offer';

type ReviewRating = RatingInForm;

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState<{ review: string; rating: ReviewRating }>({
    review: '',
    rating: '',
  });

  const isFormValid = formData.review.length >= 50 && formData.rating !== '';
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
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
