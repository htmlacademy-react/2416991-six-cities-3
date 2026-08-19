import { render, screen } from '@testing-library/react';
import faker from 'faker';
import { describe, expect, it } from 'vitest';
import OfferGoods from './offer-goods';

describe('Component: OfferGoods', () => {
  it('should render heading and all goods when goods array is not empty', () => {
    const mockGoods = [
      faker.commerce.productName(),
      faker.commerce.productName(),
      faker.commerce.productName(),
    ];

    render(<OfferGoods goods={mockGoods} />);

    const headingElement = screen.getByRole('heading', {
      level: 2,
      name: 'What\'s inside',
    });
    expect(headingElement).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockGoods.length);

    mockGoods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should render null when goods array is empty', () => {
    const { container } = render(<OfferGoods goods={[]} />);

    expect(container.firstChild).toBeNull();

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
