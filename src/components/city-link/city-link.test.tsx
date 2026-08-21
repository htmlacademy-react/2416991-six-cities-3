import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import CityLink from './city-link';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCity } from '../../utils/mocks';
import { setCurrentCity } from '../../store/slices/app/app.slice';

describe('Component: CityLink', () => {
  it('should render city name', () => {
    const city = makeFakeCity('Paris');

    const { withStoreComponent } = withStore(
      <CityLink city={city} />,
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should dispatch city and navigate to root when clicked', async () => {
    const city = makeFakeCity('Paris');

    const { withStoreComponent, mockStore } = withStore(
      <CityLink city={city} />,
    );

    render(withHistory(withStoreComponent));

    await userEvent.click(
      screen.getByRole('link', { name: 'Paris' }),
    );

    expect(mockStore.getActions()).toContainEqual(
      setCurrentCity(city),
    );
  });
});
