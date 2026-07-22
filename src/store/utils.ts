import { SortOption } from '../const/business';
import { City, SortType } from '../types/common';
import { OfferPreview } from '../types/offer';

const filterOffersByCity = (
  offers: OfferPreview[],
  city: City,
): OfferPreview[] =>
  [...offers].filter((offer) => offer.city.name === city.name);

const sortOffers = (
  offers: OfferPreview[],
  sortBy: SortType,
): OfferPreview[] => {
  switch (sortBy) {
    case SortOption.PRICE_HIGH_TO_LOW:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortOption.PRICE_LOW_TO_HIGH:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortOption.TOP_RATED_FIRST:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const filterAndSortOffers = (
  offers: OfferPreview[],
  city: City,
  sortBy: SortType,
): OfferPreview[] => sortOffers(filterOffersByCity(offers, city), sortBy);
