import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from './footer';
import { withHistory } from '../../utils/mock-component';
import { AppRoute } from '../../const/infrastructure';

describe('Component: Footer', () => {
  it('should render logo', () => {
    render(withHistory(<Footer />));

    const logo = screen.getByAltText('6 cities logo');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '33');
  });

  it('should contain link to main page', () => {
    render(withHistory(<Footer />));

    const link = screen.getByRole('link', {
      name: '6 cities logo',
    });

    expect(link).toHaveAttribute('href', AppRoute.Root);
  });
});
