import { SortOption } from '../const/business';
import { City, SortType } from '../types/common';
import { Offer, OfferPreview, ServerOffer } from '../types/offer';

const filterOffersByCity = (
  offers: OfferPreview[],
  city: City,
): OfferPreview[] => offers.filter((offer) => offer.city.name === city.name);

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

const processFavoriteStatus = (
  offers: OfferPreview[],
  favoriteOffers: OfferPreview[],
): OfferPreview[] => {
  const favoriteIds = new Set(favoriteOffers.map((offer) => offer.id));

  return offers.map((offer) => ({
    ...offer,
    isFavorite: favoriteIds.has(offer.id),
  }));
};

export const prepareOffers = (
  offers: OfferPreview[],
  favoriteOffers: OfferPreview[],
  city: City,
  sortBy: SortType,
): OfferPreview[] => {
  const filteredOffers = filterOffersByCity(offers, city);
  const sortedOffers = sortOffers(filteredOffers, sortBy);

  return processFavoriteStatus(sortedOffers, favoriteOffers);
};

export const adaptOffer = (serverOffer: ServerOffer): Offer => {
  const { bedrooms, ...rest } = serverOffer;
  return {
    ...rest,
    bedroomsQuantity: bedrooms,
  };
};
