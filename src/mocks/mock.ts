import { AuthorizationStatus } from '../const/infrastructure';
import { Review } from '../types/offer';
import { offers } from './offers';
import { reviews } from './reviews';

//! Auth NoAuth Unknown;
const authorizationStatus = AuthorizationStatus.NoAuth;

export const getAuthStatus = (): (typeof AuthorizationStatus[keyof typeof AuthorizationStatus]) => authorizationStatus;

export const getOfferById = (id: string) => offers.find((offer) => offer.id === id);

export const getReviewsById = (id: string): Review[] => {
  const reviewsById = reviews.find((review) => review.id === id);
  return reviewsById ? reviewsById.reviews : [];
};
