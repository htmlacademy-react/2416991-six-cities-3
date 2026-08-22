import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ReviewFormRatingStar from './review-form-rating-star';

describe('Component: ReviewFormRatingStar', () => {
  it('should render rating input and label', () => {
    const handleChange = vi.fn();

    render(
      <ReviewFormRatingStar
        value="5"
        title="perfect"
        checked={false}
        disabled={false}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('radio');
    const label = screen.getByTitle('perfect');

    expect(input).toHaveAttribute('value', '5');
    expect(input).toHaveAttribute('id', '5-stars');

    expect(label).toHaveAttribute('for', '5-stars');
  });

  it('should set checked and disabled states', () => {
    const handleChange = vi.fn();

    render(
      <ReviewFormRatingStar
        value="5"
        title="perfect"
        checked
        disabled
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('radio');

    expect(input).toBeChecked();
    expect(input).toBeDisabled();
  });

  it('should call onChange when rating is changed', async () => {
    const handleChange = vi.fn();

    render(
      <ReviewFormRatingStar
        value="5"
        title="perfect"
        checked={false}
        disabled={false}
        onChange={handleChange}
      />,
    );

    await userEvent.click(screen.getByRole('radio'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
