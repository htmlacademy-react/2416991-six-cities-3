import { describe, it, expect } from 'vitest';
import { MapProps } from './map';
import { areMapPropsEqual } from './utils';
import { makeFakeCity, makeFakeOfferPreview } from '../../utils/mocks';

describe('areMapPropsEqual', () => {
  const mockBlock = 'cities';
  const mockCity = makeFakeCity('Paris');

  it('should return true when block, city name, and offer IDs are identical', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');

    const prevProps: MapProps = {
      block: mockBlock,
      city: mockCity,
      offers: [offer1, offer2],
    };
    const nextProps: MapProps = {
      block: mockBlock,
      city: { ...mockCity },
      offers: [{ ...offer1 }, { ...offer2 }],
    };

    expect(areMapPropsEqual(prevProps, nextProps)).toBe(true);
  });

  it('should return false when "block" prop is different', () => {
    const offers = [makeFakeOfferPreview()];

    const prevProps: MapProps = {
      block: 'cities',
      city: mockCity,
      offers,
    };
    const nextProps: MapProps = {
      block: 'offer',
      city: mockCity,
      offers,
    };

    expect(areMapPropsEqual(prevProps, nextProps)).toBe(false);
  });

  it('should return false when city names are different', () => {
    const offers = [makeFakeOfferPreview()];

    const prevProps: MapProps = {
      block: mockBlock,
      city: makeFakeCity('Paris'),
      offers,
    };
    const nextProps: MapProps = {
      block: mockBlock,
      city: makeFakeCity('Amsterdam'),
      offers,
    };

    expect(areMapPropsEqual(prevProps, nextProps)).toBe(false);
  });

  it('should return false when offers length is different', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');

    const prevProps: MapProps = {
      block: mockBlock,
      city: mockCity,
      offers: [offer1],
    };
    const nextProps: MapProps = {
      block: mockBlock,
      city: mockCity,
      offers: [offer1, offer2],
    };

    expect(areMapPropsEqual(prevProps, nextProps)).toBe(false);
  });

  it('should return false when offer IDs are different', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');
    const offer3 = makeFakeOfferPreview('id-3');

    const prevProps: MapProps = {
      block: mockBlock,
      city: mockCity,
      offers: [offer1, offer2],
    };
    const nextProps: MapProps = {
      block: mockBlock,
      city: mockCity,
      offers: [offer1, offer3],
    };

    expect(areMapPropsEqual(prevProps, nextProps)).toBe(false);
  });

  it('should return false when offer IDs are the same but order is changed', () => {
    const offer1 = makeFakeOfferPreview('id-1');
    const offer2 = makeFakeOfferPreview('id-2');

    const prevProps: MapProps = {
      block: mockBlock,
      city: mockCity,
      offers: [offer1, offer2],
    };
    const nextProps: MapProps = {
      block: mockBlock,
      city: mockCity,
      offers: [offer2, offer1],
    };

    expect(areMapPropsEqual(prevProps, nextProps)).toBe(false);
  });
});
