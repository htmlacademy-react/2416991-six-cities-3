import { MAX_PERCENT_STARS_WIDTH, STARS_COUNT } from '../../const/business';

export const getStarsWidth = (rating: number) =>
  `${(MAX_PERCENT_STARS_WIDTH * Math.round(rating)) / STARS_COUNT}%`;
