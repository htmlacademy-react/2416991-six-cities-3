import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ReviewFormRating from './review-form-rating';
import { Rating } from '../../const/business';

vi.mock('../review-form-rating-star/review-form-rating-star', () => ({
  default: ({
    value,
    title,
    checked,
    disabled,
  }: {
    value: string;
    title: string;
    checked: boolean;
    disabled: boolean;
  }) => (
    <div data-testid="rating-star">
      <span data-testid="star-value">{value}</span>
      <span data-testid="star-title">{title}</span>
      <span data-testid="star-checked">{String(checked)}</span>
      <span data-testid="star-disabled">{String(disabled)}</span>
    </div>
  ),
}));

describe('Component: ReviewFormRating', () => {
  it('should render all rating stars', () => {
    render(
      <ReviewFormRating
        rating={0}
        disabled={false}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getAllByTestId('rating-star')).toHaveLength(
      Object.keys(Rating).length,
    );
  });

  it('should pass correct values and titles to rating stars', () => {
    render(
      <ReviewFormRating
        rating={0}
        disabled={false}
        onChange={vi.fn()}
      />,
    );

    const values = screen.getAllByTestId('star-value');
    const titles = screen.getAllByTestId('star-title');

    const expectedValues = Object.keys(Rating).reverse();

    expect(
      values.map((element) => element.textContent),
    ).toEqual(expectedValues);

    expect(
      titles.map((element) => element.textContent),
    ).toEqual(
      expectedValues.map(
        (value) => Rating[Number(value) as keyof typeof Rating],
      ),
    );
  });

  it('should mark selected rating as checked', () => {
    render(
      <ReviewFormRating
        rating={4}
        disabled={false}
        onChange={vi.fn()}
      />,
    );

    const checked = screen.getAllByTestId('star-checked');

    expect(
      checked.map((element) => element.textContent),
    ).toEqual([
      'false',
      'true',
      'false',
      'false',
      'false',
    ]);
  });

  it('should pass disabled prop to all rating stars', () => {
    render(
      <ReviewFormRating
        rating={3}
        disabled
        onChange={vi.fn()}
      />,
    );

    const disabled = screen.getAllByTestId('star-disabled');

    expect(
      disabled.every((element) => element.textContent === 'true'),
    ).toBe(true);
  });
});
