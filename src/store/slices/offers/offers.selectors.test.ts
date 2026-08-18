import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { NameSpace } from '../../../const/infrastructure';
import { OfferPreview } from '../../../types/offer';
import { City, CityName, SortType } from '../../../types/common';
import {
  getRawOffers,
  getIsOffersLoading,
  getIsOffersLoadingError,
  getOffers,
} from './offers.selectors';

const makeFakeCity = (name: CityName): City => ({
  name,
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
});

const makeFakeOfferPreview = (cityName: CityName, price: number, id?: string): OfferPreview => ({
  id: id || faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price,
  city: makeFakeCity(cityName),
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: faker.image.imageUrl(),
});

describe('Offers selectors', () => {
  const parisOfferLowPrice = makeFakeOfferPreview('Paris', 100, 'paris-1');
  const parisOfferHighPrice = makeFakeOfferPreview('Paris', 300, 'paris-2');
  const amsterdamOffer = makeFakeOfferPreview('Amsterdam', 200, 'amsterdam-1');

  const mockRawOffers = [parisOfferLowPrice, amsterdamOffer, parisOfferHighPrice];

  const state = {
    [NameSpace.Offers]: {
      offers: mockRawOffers,
      isOffersLoading: false,
      isOffersLoadingError: false,
    },
    [NameSpace.App]: {
      currentCity: makeFakeCity('Paris'),
      sortOption: 'Popular' as SortType,
      activeOfferId: null,
    },
  };

  describe('Simple selectors', () => {
    it('should return raw offers from state', () => {
      const { offers } = state[NameSpace.Offers];
      const result = getRawOffers(state);
      expect(result).toEqual(offers);
    });

    it('should return isOffersLoading status from state', () => {
      const { isOffersLoading } = state[NameSpace.Offers];
      const result = getIsOffersLoading(state);
      expect(result).toBe(isOffersLoading);
    });

    it('should return isOffersLoadingError status from state', () => {
      const { isOffersLoadingError } = state[NameSpace.Offers];
      const result = getIsOffersLoadingError(state);
      expect(result).toBe(isOffersLoadingError);
    });
  });

  describe('getOffers selector', () => {
    it('should return filtered by city and sorted offers', () => {
      const result = getOffers(state);

      expect(result).toHaveLength(2);
      expect(result).toEqual([parisOfferLowPrice, parisOfferHighPrice]);
    });

    it('should return memoized result on consecutive calls with same state', () => {
      const result1 = getOffers(state);
      const result2 = getOffers(state);

      expect(result1).toBe(result2);
    });
  });
});
