import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CardList from './card-list';
import { makeFakeOfferPreview } from '../../utils/mocks';

vi.mock('../offer-card/offer-card', () => ({
  OfferCard: ({ offer }: { offer: { id: string } }) => (
    <div data-testid="offer-card">{offer.id}</div>
  ),
}));

describe('Component: CardList', () => {
  it('should render offer cards', () => {
    const offers = [
      makeFakeOfferPreview('offer-1'),
      makeFakeOfferPreview('offer-2'),
      makeFakeOfferPreview('offer-3'),
    ];

    render(<CardList offers={offers} />);

    const cards = screen.getAllByTestId('offer-card');

    expect(cards).toHaveLength(offers.length);

    offers.forEach((offer, index) => {
      expect(cards[index]).toHaveTextContent(offer.id);
    });
  });
});
