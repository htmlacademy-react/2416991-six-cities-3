import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import LogoLink from './logo-link';
import { AppRoute } from '../../const/infrastructure';

describe('Component: LogoLink', () => {
  it('should render active logo on main page', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Root]}>
        <LogoLink />
      </MemoryRouter>,
    );

    const logo = screen.getByAltText('6 cities logo');
    const link = logo.closest('a');

    expect(link).toHaveClass(
      'header__logo-link',
      'header__logo-link--active',
    );

    expect(link).not.toHaveAttribute('href');
  });

  it('should render link to main page on other pages', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <LogoLink />
      </MemoryRouter>,
    );

    const logo = screen.getByAltText('6 cities logo');
    const link = logo.closest('a');

    expect(link).toHaveClass('header__logo-link');
    expect(link).not.toHaveClass('header__logo-link--active');
    expect(link).toHaveAttribute('href', AppRoute.Root);
  });
});
