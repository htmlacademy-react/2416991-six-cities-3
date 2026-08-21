import { describe, it, expect } from 'vitest';
import { NameSpace } from '../../../const/infrastructure';
import { SortType } from '../../../types/common';
import {
  getRawOffers,
  getIsOffersLoading,
  getIsOffersLoadingError,
  getOffers,
} from './offers.selectors';
import { makeFakeCity, makeFakeOfferPreview } from '../../../utils/mocks';

describe('Offers selectors', () => {
  const parisOfferLowPrice = makeFakeOfferPreview('paris-1', 'Paris', 100);
  const parisOfferHighPrice = makeFakeOfferPreview('paris-2', 'Paris', 300);
  const amsterdamOffer = makeFakeOfferPreview('amsterdam-1', 'Amsterdam', 200);

  const mockRawOffers = [
    parisOfferLowPrice,
    amsterdamOffer,
    parisOfferHighPrice,
  ];

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
