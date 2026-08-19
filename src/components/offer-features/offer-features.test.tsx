import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OfferFeatures from './offer-features';

describe('Component: OfferFeatures', () => {
  it('should render singular text correctly when quantities are equal to 1', () => {
    render(
      <OfferFeatures type="apartment" bedroomsQuantity={1} maxAdults={1} />,
    );

    expect(screen.getByText('Apartment')).toBeInTheDocument();

    expect(screen.getByText('1 Bedroom')).toBeInTheDocument();
    expect(screen.getByText('Max 1 adult')).toBeInTheDocument();
  });

  it('should render plural text correctly when quantities are greater than 1', () => {
    render(<OfferFeatures type="house" bedroomsQuantity={3} maxAdults={4} />);

    expect(screen.getByText('House')).toBeInTheDocument();

    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 4 adults')).toBeInTheDocument();
  });

  it('should render 3 feature items in a list', () => {
    render(<OfferFeatures type="room" bedroomsQuantity={1} maxAdults={2} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });
});
