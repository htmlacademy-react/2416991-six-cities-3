import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NearOffers from './near-offers';
import { makeFakeOfferPreview } from '../../utils/mocks';

vi.mock('../offer-card/offer-card', () => ({
  OfferCard: ({
    offer,
  }: {
    offer: ReturnType<typeof makeFakeOfferPreview>;
  }) => <div data-testid="offer-card">{offer.title}</div>,
}));

describe('Component: NearOffers', () => {
  it('should render nothing when offers list is empty', () => {
    const { container } = render(<NearOffers offers={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render offers', () => {
    const offers = [makeFakeOfferPreview(), makeFakeOfferPreview()];

    render(<NearOffers offers={offers} />);

    expect(
      screen.getByText('Other places in the neighbourhood'),
    ).toBeInTheDocument();

    expect(screen.getAllByTestId('offer-card')).toHaveLength(2);
  });

  it('should render only first three offers', () => {
    const offers = [
      makeFakeOfferPreview(),
      makeFakeOfferPreview(),
      makeFakeOfferPreview(),
      makeFakeOfferPreview(),
      makeFakeOfferPreview(),
    ];

    render(<NearOffers offers={offers} />);

    expect(screen.getAllByTestId('offer-card')).toHaveLength(3);
  });
});
