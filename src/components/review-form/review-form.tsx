import { useState } from 'react';
import ReviewFormRating from '../review-form-rating/review-form-rating';
import { ReviewFormData, ReviewRating } from './types';
import { validateReviewForm } from './utils';
import { useAppDispatch } from '../../hooks';
import { postReview } from '../../store/api-actions';
import { OfferPreview, ReviewServer } from '../../types/offer';
import { MIN_REVIEW_CHARACTERS } from './const';

type ReviewFormProps = {
  id: OfferPreview['id'];
}

function ReviewForm({ id }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ReviewFormData>({
    comment: '',
    rating: '',
  });

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        if (formData.rating !== '' && formData.comment.length >= MIN_REVIEW_CHARACTERS) {
          const rating = Number(formData.rating) as ReviewServer['rating'];
          const comment = formData.comment;
          dispatch(postReview({rating, comment, id}));
        }
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewFormRating rating={formData.rating} onChange={(evt) => setFormData({ ...formData, rating: evt.target.value as ReviewRating })} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={(evt) => setFormData({ ...formData, comment: evt.target.value })}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!validateReviewForm(formData)}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
