import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Header from './header';
import { AppRoute } from '../../const/infrastructure';
import { withHistory } from '../../utils/mock-component';

vi.mock('../logo-link/logo-link', () => ({
  default: () => <div>Logo</div>,
}));

vi.mock('../user-panel/user-panel', () => ({
  default: () => <div>User panel</div>,
}));

describe('Component: Header', () => {
  it('should render logo and user panel on main page', () => {
    render(
      withHistory(<Header />, [AppRoute.Root]),
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('User panel')).toBeInTheDocument();
  });

  it('should render only logo on login page', () => {
    render(
      withHistory(<Header />, [AppRoute.Login]),
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.queryByText('User panel')).not.toBeInTheDocument();
  });
});
