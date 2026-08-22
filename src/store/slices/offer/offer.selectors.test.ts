import { describe, it, expect } from 'vitest';
import { NameSpace } from '../../../const/infrastructure';
import {
  getOffer,
  getNearOffers,
  getIsOfferLoading,
  getIsOfferLoadingError,
  getOfferLoadingErrorCode,
  getIsNearOffersLoading,
} from './offer.selectors';
import { makeFakeOffer, makeFakeOfferPreview } from '../../../utils/mocks';

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
