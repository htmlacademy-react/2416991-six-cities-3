import { describe, it, expect } from 'vitest';
import faker from 'faker';
import {
  prepareOffers,
  adaptOffer,
  adaptFavoriteResponseToPreview,
} from './utils';
import { SortOption } from '../const/business';
import { FavoriteStatus } from '../const/infrastructure';
import {
  OfferPreview,
  ServerOffer,
  ServerFavoriteResponse,
} from '../types/offer';
import { City, CityName } from '../types/common';

const makeFakeCity = (name: CityName = 'Paris'): City => ({
  name,
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
});

const makeFakeOfferPreview = (
  cityName: CityName = 'Paris',
  price = 100,
  rating = 4.0,
  id?: string,
): OfferPreview => ({
  id: id || faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price,
  rating,
  city: makeFakeCity(cityName),
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  previewImage: faker.image.imageUrl(),
});

describe('Store Utils', () => {
  describe('prepareOffers', () => {
    const parisCheap = makeFakeOfferPreview('Paris', 100, 3.0, 'p1');
    const parisExpensive = makeFakeOfferPreview('Paris', 500, 5.0, 'p2');
    const amsterdamOffer = makeFakeOfferPreview('Amsterdam', 300, 4.5, 'a1');

    const offers = [parisCheap, amsterdamOffer, parisExpensive];
    const paris = makeFakeCity('Paris');

    it('should filter offers by city and keep default order for POPULAR', () => {
      const result = prepareOffers(offers, paris, SortOption.POPULAR);

      expect(result).toEqual([parisCheap, parisExpensive]);
    });

    it('should filter by city and sort offers by price: low to high', () => {
      const result = prepareOffers(offers, paris, SortOption.PRICE_LOW_TO_HIGH);

      expect(result).toEqual([parisCheap, parisExpensive]);
    });

    it('should filter by city and sort offers by price: high to low', () => {
      const result = prepareOffers(offers, paris, SortOption.PRICE_HIGH_TO_LOW);

      expect(result).toEqual([parisExpensive, parisCheap]);
    });

    it('should filter by city and sort offers by top rated first', () => {
      const result = prepareOffers(offers, paris, SortOption.TOP_RATED_FIRST);

      expect(result).toEqual([parisExpensive, parisCheap]);
    });

    it('should return empty array if no offers match the city', () => {
      const cologne = makeFakeCity('Cologne');
      const result = prepareOffers(offers, cologne, SortOption.POPULAR);

      expect(result).toEqual([]);
    });
  });

  describe('adaptOffer', () => {
    it('should map "bedrooms" property to "bedroomsQuantity"', () => {
      const serverOffer: ServerOffer = {
        id: 'server-offer-id',
        title: 'Nice Place',
        type: 'house',
        price: 250,
        city: makeFakeCity('Paris'),
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
        isFavorite: false,
        isPremium: true,
        rating: 4.8,
        description: 'Cozy home',
        images: ['img1.jpg', 'img2.jpg'],
        goods: ['Wi-Fi'],
        host: { name: 'John', avatarUrl: 'avatar.jpg', isPro: true },
        bedrooms: 3,
        maxAdults: 4,
      };

      const result = adaptOffer(serverOffer);

      const expectedOffer: Partial<ServerOffer> = { ...serverOffer };
      delete expectedOffer.bedrooms;

      expect(result).toEqual({
        ...expectedOffer,
        bedroomsQuantity: 3,
      });
      expect(result).not.toHaveProperty('bedrooms');
    });
  });

  describe('adaptFavoriteResponseToPreview', () => {
    const baseServerData = {
      id: 'fav-1',
      title: 'Favorite Place',
      type: 'hotel' as const,
      price: 150,
      city: makeFakeCity('Paris'),
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: false,
      isPremium: true,
      rating: 4.2,
    };

    it('should pick "previewImage" if present in data', () => {
      const data: ServerFavoriteResponse = {
        ...baseServerData,
        previewImage: 'preview-image.jpg',
      };

      const result = adaptFavoriteResponseToPreview(
        data,
        FavoriteStatus.Yes,
        'fallback.jpg',
      );

      expect(result.previewImage).toBe('preview-image.jpg');
      expect(result.isFavorite).toBe(true);
    });

    it('should fallback to fallbackPreviewImage if "previewImage" is missing', () => {
      const data = {
        ...baseServerData,
        images: [],
      } as unknown as ServerFavoriteResponse;

      const result = adaptFavoriteResponseToPreview(
        data,
        FavoriteStatus.Yes,
        'fallback.jpg',
      );

      expect(result.previewImage).toBe('fallback.jpg');
      expect(result.isFavorite).toBe(true);
    });

    it('should pick first item from "images" if "previewImage" and fallback are missing', () => {
      const data = {
        ...baseServerData,
        images: ['first-image.jpg', 'second-image.jpg'],
      } as unknown as ServerFavoriteResponse;

      const result = adaptFavoriteResponseToPreview(data, FavoriteStatus.No);

      expect(result.previewImage).toBe('first-image.jpg');
      expect(result.isFavorite).toBe(false);
    });

    it('should set empty string for previewImage if no image sources are available', () => {
      const data = {
        ...baseServerData,
      } as unknown as ServerFavoriteResponse;

      const result = adaptFavoriteResponseToPreview(data, FavoriteStatus.No);

      expect(result.previewImage).toBe('');
      expect(result.isFavorite).toBe(false);
    });
  });
});
