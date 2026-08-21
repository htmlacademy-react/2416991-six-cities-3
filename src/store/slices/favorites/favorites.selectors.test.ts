import { describe, it, expect } from 'vitest';
import { NameSpace } from '../../../const/infrastructure';
import { Cities } from '../../../const/business';
import {
  geIsFavoritesLoading,
  getFavorites,
  getGroupedFavorites,
} from './favorites.selectors';
import { makeFakeOfferPreview } from '../../../utils/mocks';

describe('Favorites selectors', () => {
  const parisOffer1 = makeFakeOfferPreview('paris-1', 'Paris');
  const parisOffer2 = makeFakeOfferPreview('paris-2', 'Paris');
  const amsterdamOffer = makeFakeOfferPreview('amsterdam-1', 'Amsterdam');

  const mockFavoriteOffers = [parisOffer1, parisOffer2, amsterdamOffer];

  const state = {
    [NameSpace.Favorites]: {
      favoriteOffers: mockFavoriteOffers,
      isFavoritesLoading: false,
    },
  };

  describe('Simple selectors', () => {
    it('should return favorite offers from state', () => {
      const { favoriteOffers } = state[NameSpace.Favorites];
      const result = getFavorites(state);
      expect(result).toEqual(favoriteOffers);
    });

    it('should return isFavoritesLoading status from state', () => {
      const { isFavoritesLoading } = state[NameSpace.Favorites];
      const result = geIsFavoritesLoading(state);
      expect(result).toBe(isFavoritesLoading);
    });
  });

  describe('getGroupedFavorites selector', () => {
    it('should group favorite offers by city and exclude cities without offers', () => {
      const result = getGroupedFavorites(state);

      const parisCity = Cities.find((c) => c.name === 'Paris')!;
      const amsterdamCity = Cities.find((c) => c.name === 'Amsterdam')!;

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        {
          city: parisCity,
          offers: [parisOffer1, parisOffer2],
        },
        {
          city: amsterdamCity,
          offers: [amsterdamOffer],
        },
      ]);
    });

    it('should return empty array when there are no favorite offers', () => {
      const emptyState = {
        [NameSpace.Favorites]: {
          favoriteOffers: [],
          isFavoritesLoading: false,
        },
      };

      const result = getGroupedFavorites(emptyState);
      expect(result).toEqual([]);
    });

    it('should return memoized result on consecutive calls with same state', () => {
      const result1 = getGroupedFavorites(state);
      const result2 = getGroupedFavorites(state);

      expect(result1).toBe(result2);
    });
  });
});
