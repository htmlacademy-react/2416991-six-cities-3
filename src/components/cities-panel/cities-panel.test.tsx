import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CitiesPanel from './cities-panel';
import { Cities } from '../../const/business';

describe('Component: CitiesPanel', () => {
  it('should render all cities', () => {
    const onCityClick = vi.fn();

    render(
      <CitiesPanel activeCity={Cities[0].name} onCityClick={onCityClick} />,
    );

    Cities.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should mark active city', () => {
    const onCityClick = vi.fn();
    const activeCity = Cities[0];

    render(
      <CitiesPanel activeCity={activeCity.name} onCityClick={onCityClick} />,
    );

    const activeTab = screen.getByText(activeCity.name).closest('a');

    expect(activeTab).toHaveClass('tabs__item--active');
  });

  it('should call onCityClick when inactive city is clicked', async () => {
    const onCityClick = vi.fn();
    const activeCity = Cities[0];
    const targetCity = Cities[1];

    render(
      <CitiesPanel activeCity={activeCity.name} onCityClick={onCityClick} />,
    );

    await userEvent.click(screen.getByText(targetCity.name));

    expect(onCityClick).toHaveBeenCalledTimes(1);
    expect(onCityClick).toHaveBeenCalledWith(targetCity);
  });
});
