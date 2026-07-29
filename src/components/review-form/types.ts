import { RatingInForm } from '../../types/offer';

export type ReviewRating = RatingInForm;

export type ReviewFormData = {
  comment: string;
  rating: ReviewRating;
};
