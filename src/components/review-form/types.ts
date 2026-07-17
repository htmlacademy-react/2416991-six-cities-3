import { RatingInForm } from '../../types/offer';

export type ReviewRating = RatingInForm;

export type ReviewFormData = {
  review: string;
  rating: ReviewRating;
};
