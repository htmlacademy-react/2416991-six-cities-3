import { MIN_REVIEW_CHARACTERS } from './const';
import { ReviewFormData } from './types';

export const validateReviewForm = (reviewFormData: ReviewFormData) =>
  reviewFormData.comment.length >= MIN_REVIEW_CHARACTERS && reviewFormData.rating !== 0;
