import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NoPlaces from './no-places';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeCity } from '../../utils/mocks';

describe('Component: NoPlaces', () => {
  it('should render current city name', () => {
    const city = makeFakeCity('Paris');

    const { withStoreComponent } = withStore(
      <NoPlaces />,
      makeFakeStore({
        APP: {
          activeOfferId: null,
          currentCity: city,
          sortOption: 'Popular',
        },
      }),
    );

    render(withStoreComponent);

    expect(
      screen.getByText(
        `We could not find any property available at the moment in ${city.name}`,
      ),
    ).toBeInTheDocument();
  });
});
