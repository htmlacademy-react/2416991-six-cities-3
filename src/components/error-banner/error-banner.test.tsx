
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import ErrorBanner from './error-banner';
import { withStore } from '../../utils/mock-component';
import { fetchOffersAction } from '../../store/api-actions';
import {
  extractActionsTypes,
  makeFakeStore,
} from '../../utils/mocks';

describe('Component: ErrorBanner', () => {
  it('should render error message and button', () => {
    const { withStoreComponent } = withStore(
      <ErrorBanner />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(
      screen.getByText('Failed to load offers'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
  });

  it('should dispatch fetchOffersAction when button is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <ErrorBanner />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    await userEvent.click(
      screen.getByRole('button', { name: 'Try again' }),
    );

    expect(extractActionsTypes(mockStore.getActions())).toContain(
      fetchOffersAction.pending.type,
    );
  });
});
