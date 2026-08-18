import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { NameSpace } from '../../../const/infrastructure';
import { Cities } from '../../../const/business';
import { OfferPreview } from '../../../types/offer';
import { geIsFavoritesLoading, getFavorites, getGroupedFavorites } from './favorites.selectors';


const makeFakeOfferPreview = (cityName: string, id?: string): OfferPreview => ({
  id: id || faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: 100,
  city: Cities.find((city) => city.name === cityName) || Cities[0],
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  previewImage: faker.image.imageUrl(),
});

describe('Favorites selectors', () => {
  const parisOffer1 = makeFakeOfferPreview('Paris', 'paris-1');
  const parisOffer2 = makeFakeOfferPreview('Paris', 'paris-2');
  const amsterdamOffer = makeFakeOfferPreview('Amsterdam', 'amsterdam-1');

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
