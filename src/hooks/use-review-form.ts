import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReviewFormData } from '../components/review-form/types';
import { validateReviewForm } from '../components/review-form/utils';
import { MIN_REVIEW_CHARACTERS } from '../components/review-form/const';
import { useAppDispatch } from '.';
import { postReview } from '../store/api-actions';

const INITIAL_FORM_STATE: ReviewFormData = {
  comment: '',
  rating: 0,
};

export const useReviewForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ReviewFormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = validateReviewForm(formData);

  const handleRatingChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const rating = Number(evt.target.value);
      setFormData((prev) => ({ ...prev, rating }));
    },
    [],
  );

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = evt.target.value;
    setFormData((prev) => ({ ...prev, comment }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!id || !isValid || isSubmitting) {
      return;
    }

    if (
      formData.rating === 0 ||
      formData.comment.length < MIN_REVIEW_CHARACTERS
    ) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(
      postReview({
        rating: formData.rating,
        comment: formData.comment,
        id,
      }),
    )
      .unwrap()
      .then(() => {
        setFormData(INITIAL_FORM_STATE);
      })
      .catch(() => {
        toast.warn(
          'A technical error occurred while submitting the form; please try again later.',
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return {
    formData,
    isValid,
    isSubmitting,
    handleRatingChange,
    handleTextChange,
    handleSubmit,
  };
};
