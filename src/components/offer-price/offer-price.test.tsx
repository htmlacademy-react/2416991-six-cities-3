import { render, screen } from '@testing-library/react';
import faker from 'faker';
import { describe, expect, it } from 'vitest';
import OfferPrice from './offer-price';

describe('Component: OfferPrice', () => {
  it('should render price with Euro symbol and night label correctly', () => {
    const mockPrice = faker.datatype.number({ min: 10, max: 1000 });

    render(<OfferPrice price={mockPrice} />);

    expect(screen.getByText(`€${mockPrice}`)).toBeInTheDocument();

    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });
});
