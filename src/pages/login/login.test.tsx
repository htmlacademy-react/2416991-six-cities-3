import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Login from './login';
import { withHistory } from '../../utils/mock-component';
import { Cities } from '../../const/business';

vi.mock('../../components/login-form/login-form', () => ({
  default: () => <div>Login form</div>,
}));

vi.mock('../../components/city-link/city-link', () => ({
  default: ({ city }: { city: { name: string } }) => (
    <div>City link: {city.name}</div>
  ),
}));

describe('Page: Login', () => {
  it('should render login form and title', () => {
    render(withHistory(<Login />));

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Login form')).toBeInTheDocument();
  });

  it('should render a city from cities list', () => {
    render(withHistory(<Login />));

    const cityNames = Cities.map(({ name }) => name);

    const cityLink = screen.getByText(/City link:/);

    expect(
      cityNames.some((name) =>
        cityLink.textContent?.includes(name),
      ),
    ).toBe(true);
  });
});
