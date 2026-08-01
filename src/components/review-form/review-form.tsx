import { ChangeEvent, FormEvent, useState } from 'react';
import ReviewFormRating from '../review-form-rating/review-form-rating';
import { ReviewFormData } from './types';
import { validateReviewForm } from './utils';
import { useAppDispatch } from '../../hooks';
import { postReview } from '../../store/api-actions';
import { OfferPreview } from '../../types/offer';
import { MIN_REVIEW_CHARACTERS } from './const';
import { toast } from 'react-toastify';

type ReviewFormProps = {
  id: OfferPreview['id'];
};

function ReviewForm({ id }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ReviewFormData>({
    comment: '',
    rating: 0,
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, rating: Number(evt.target.value) }));

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, comment: evt.target.value }));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (
      formData.rating !== 0 &&
      formData.comment.length >= MIN_REVIEW_CHARACTERS
    ) {
      const rating = formData.rating;
      const comment = formData.comment;

      void dispatch(postReview({ rating, comment, id }))
        .unwrap()
        .then(() => {
          setFormData({
            comment: '',
            rating: 0,
          });
        })
        .catch(() => {
          toast.warn(
            'A technical error occurred while submitting the form; please try again later.',
          );
        });
    }
  };

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
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleTextChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!validateReviewForm(formData)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
