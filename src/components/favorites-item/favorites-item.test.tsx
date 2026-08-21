import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FavoritesItem from './favorites-item';
import { makeFakeOfferPreview } from '../../utils/mocks';
import { CityName } from '../../types/common';
import { OfferPreview } from '../../types/offer';

vi.mock('../offer-card/offer-card', () => ({
  OfferCard: ({ offer }: { offer: OfferPreview }) => (
    <div data-testid="offer-card">{offer.title}</div>
  ),
}));

describe('Component: FavoritesItem', () => {
  it('should render city name', () => {
    const city: CityName = 'Paris';

    render(<FavoritesItem city={city} offers={[]} />);

    expect(screen.getByText(city)).toBeInTheDocument();
  });

  it('should render OfferCard for every offer', () => {
    const offers = [
      makeFakeOfferPreview('offer-1'),
      makeFakeOfferPreview('offer-2'),
      makeFakeOfferPreview('offer-3'),
    ];

    render(<FavoritesItem city="Paris" offers={offers} />);

    expect(screen.getAllByTestId('offer-card')).toHaveLength(3);
    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
    expect(screen.getByText(offers[1].title)).toBeInTheDocument();
    expect(screen.getByText(offers[2].title)).toBeInTheDocument();
  });
});
