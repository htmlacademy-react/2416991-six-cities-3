import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SPIN_ANIMATION_STYLE } from './const';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render accessible loading status with correct aria-label', () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByRole('status', { name: /loading/i });

    expect(spinnerContainer).toBeInTheDocument();
  });

  it('should inject CSS keyframes animation into DOM', () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByRole('status', { name: /loading/i });
    const styleElement = spinnerContainer.querySelector('style');

    expect(styleElement).toBeInTheDocument();
    expect(styleElement?.textContent).toBe(SPIN_ANIMATION_STYLE);
  });

  it('should apply container and spinner inline styles correctly', () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByRole('status', { name: /loading/i });
    const innerSpinnerDiv = spinnerContainer.querySelector('div');

    expect(spinnerContainer).toHaveStyle({
      display: 'flex',
      position: 'absolute',
      width: '100%',
    });

    expect(innerSpinnerDiv).toHaveStyle({
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    });
  });
});
