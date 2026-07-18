import { AuthorizationStatus } from '../const/infrastructure';
import { City, Review } from '../types/offer';
import { offers, previewOffers } from './offers';
import { reviews } from './reviews';

//! Auth NoAuth Unknown;
const authorizationStatus = AuthorizationStatus.Auth;

export const getAuthStatus = (): (typeof AuthorizationStatus[keyof typeof AuthorizationStatus]) => authorizationStatus;

export const getOfferById = (id: string) => offers.find((offer) => offer.id === id);

export const getPreviewOfferById = (id: string) => previewOffers.find((offer) => offer.id === id);

export const getReviewsById = (id: string): Review[] => {
  const reviewsById = reviews.find((review) => review.id === id);
  return reviewsById ? reviewsById.reviews : [];
};

export const tempActiveCity: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 12,
  },
};
