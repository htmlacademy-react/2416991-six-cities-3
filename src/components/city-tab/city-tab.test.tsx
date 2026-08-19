import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { City } from '../../types/common';
import CityTab from './city-tab';

describe('Component: CityTab', () => {
  const mockCity: City = {
    name: 'Paris',
    location: { latitude: 50, longitude: 50, zoom: 10 },
  };

  it('should render active state correctly', () => {
    render(<CityTab city={mockCity} isActive onTabClick={vi.fn()} />);

    const tabLink = screen.getByRole('link', { name: mockCity.name });

    expect(tabLink).toBeInTheDocument();
    expect(tabLink).toHaveClass('tabs__item--active');
  });

  it('should render inactive state correctly', () => {
    render(<CityTab city={mockCity} isActive={false} onTabClick={vi.fn()} />);

    const tabLink = screen.getByRole('link', { name: mockCity.name });

    expect(tabLink).toBeInTheDocument();
    expect(tabLink).not.toHaveClass('tabs__item--active');
  });
});
