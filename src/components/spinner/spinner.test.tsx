import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render accessible loading status with correct aria-label', () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByRole('status', { name: /loading/i });

    expect(spinnerContainer).toBeInTheDocument();
  });

  it('should render inner spinner icon element', () => {
    render(<Spinner />);

    const spinnerIcon = screen.getByTestId('spinner-icon');

    expect(spinnerIcon).toBeInTheDocument();
  });
});
