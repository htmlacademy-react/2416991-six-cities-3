import { describe, it, expect } from 'vitest';
import { areFavoritesItemPropsEqual } from './utils';
import { Cities } from '../../const/business';
import { makeFakeOfferPreview } from '../../utils/mocks';

describe('areFavoritesItemPropsEqual', () => {
  const mockCity = Cities[0].name;

  it('should return true when city and offer IDs are identical', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');

    const prevProps = { city: mockCity, offers: [offer1, offer2] };
    const nextProps = {
      city: mockCity,
      offers: [{ ...offer1 }, { ...offer2 }],
    };

    expect(areFavoritesItemPropsEqual(prevProps, nextProps)).toBe(true);
  });

  it('should return false when cities are different', () => {
    const offers = [makeFakeOfferPreview()];

    const prevProps = { city:  Cities[0].name, offers };
    const nextProps = { city:  Cities[1].name, offers };

    expect(areFavoritesItemPropsEqual(prevProps, nextProps)).toBe(false);
  });

  it('should return false when offers length is different', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');

    const prevProps = { city: mockCity, offers: [offer1] };
    const nextProps = { city: mockCity, offers: [offer1, offer2] };

    expect(areFavoritesItemPropsEqual(prevProps, nextProps)).toBe(false);
  });

  it('should return false when offers have same length but different offer IDs', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');
    const offer3 = makeFakeOfferPreview('id-3');

    const prevProps = { city: mockCity, offers: [offer1, offer2] };
    const nextProps = { city: mockCity, offers: [offer1, offer3] };

    expect(areFavoritesItemPropsEqual(prevProps, nextProps)).toBe(false);
  });

  it('should return false when offer IDs are the same but order is changed', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');

    const prevProps = { city: mockCity, offers: [offer1, offer2] };
    const nextProps = { city: mockCity, offers: [offer2, offer1] };

    expect(areFavoritesItemPropsEqual(prevProps, nextProps)).toBe(false);
  });
});
