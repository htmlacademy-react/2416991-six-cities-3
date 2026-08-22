import { Cities, DEFAULT_CITY } from '../../const/business';
import { City } from '../../types/common';
import { getRandomElement } from '../../utils/common';

export const getRandomCity = () => getRandomElement<City>(Cities) || DEFAULT_CITY;

