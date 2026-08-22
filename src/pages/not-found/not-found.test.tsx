import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NotFound from './not-found';
import { withHistory } from '../../utils/mock-component';

describe('Component: NotFound', () => {
  it('should render not found page', () => {
    render(withHistory(<NotFound />));

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();

    expect(
      screen.getByText('Oops! That page does not exist'),
    ).toBeInTheDocument();
  });

  it('should render link to home page', () => {
    render(withHistory(<NotFound />));

    const link = screen.getByRole('link', {
      name: 'Return to the home page',
    });

    expect(link).toHaveAttribute('href', '/');
  });

  it('should change link styles on mouse enter and mouse leave', () => {
    render(withHistory(<NotFound />));

    const link = screen.getByRole('link', {
      name: 'Return to the home page',
    });

    fireEvent.mouseEnter(link);

    expect(link.style.backgroundColor).toBe('rgb(68, 129, 195)');
    expect(link.style.color).toBe('rgb(255, 255, 255)');

    fireEvent.mouseLeave(link);

    expect(link.style.backgroundColor).toBe('transparent');
    expect(link.style.color).toBe('rgb(51, 51, 51)');
  });
});
