import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { NameSpace } from '../../../const/infrastructure';
import { Offer, OfferPreview } from '../../../types/offer';
import {
  getOffer,
  getNearOffers,
  getIsOfferLoading,
  getIsOfferLoadingError,
  getOfferLoadingErrorCode,
  getIsNearOffersLoading,
} from './offer.selectors';

const makeFakeOffer = (): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: 200,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: true,
  rating: 4.8,
  description: faker.lorem.paragraph(),
  bedroomsQuantity: 2,
  goods: ['Wi-Fi', 'Heating'],
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: true,
  },
  images: [faker.image.imageUrl()],
  maxAdults: 3,
});

const makeFakeOfferPreview = (): OfferPreview => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'room',
  price: 80,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: true,
  isPremium: false,
  rating: 4.2,
  previewImage: faker.image.imageUrl(),
});

describe('Offer selectors', () => {
  const mockOffer = makeFakeOffer();
  const mockNearOffers = [makeFakeOfferPreview(), makeFakeOfferPreview()];

  const state = {
    [NameSpace.Offer]: {
      offer: mockOffer,
      nearOffers: mockNearOffers,
      isOfferLoading: false,
      isOfferLoadingError: true,
      offerLoadingErrorCode: 404,
      isNearOffersLoading: false,
    },
  };

  it('should return offer from state', () => {
    const { offer } = state[NameSpace.Offer];
    const result = getOffer(state);
    expect(result).toEqual(offer);
  });

  it('should return near offers from state', () => {
    const { nearOffers } = state[NameSpace.Offer];
    const result = getNearOffers(state);
    expect(result).toEqual(nearOffers);
  });

  it('should return isOfferLoading status from state', () => {
    const { isOfferLoading } = state[NameSpace.Offer];
    const result = getIsOfferLoading(state);
    expect(result).toBe(isOfferLoading);
  });

  it('should return isOfferLoadingError status from state', () => {
    const { isOfferLoadingError } = state[NameSpace.Offer];
    const result = getIsOfferLoadingError(state);
    expect(result).toBe(isOfferLoadingError);
  });

  it('should return offerLoadingErrorCode from state', () => {
    const { offerLoadingErrorCode } = state[NameSpace.Offer];
    const result = getOfferLoadingErrorCode(state);
    expect(result).toBe(offerLoadingErrorCode);
  });

  it('should return isNearOffersLoading status from state', () => {
    const { isNearOffersLoading } = state[NameSpace.Offer];
    const result = getIsNearOffersLoading(state);
    expect(result).toBe(isNearOffersLoading);
  });
});
