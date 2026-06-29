import { OfferCardBlockName } from './types/common';

export const Setting = {
  NumberOfOffers: 312,
} as const;

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export const OfferCardBlock: Record<string, OfferCardBlockName> = {
  CITIES: 'cities',
  FAVORITES: 'favorites',
  NEAR_PLACES: 'near-places',
} as const;
