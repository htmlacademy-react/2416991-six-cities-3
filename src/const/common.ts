export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export const Block = {
  CITIES: 'cities',
  FAVORITES: 'favorites',
  NEAR_PLACES: 'near-places',
  OFFER: 'offer',
  PLACE_CARD: 'place-card',
  REVIEWS: 'reviews',
} as const;
