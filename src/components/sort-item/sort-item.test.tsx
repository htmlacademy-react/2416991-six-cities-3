import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SortItem from './sort-item';

describe('Component: SortItem', () => {
  it('should render active item', () => {
    render(
      <SortItem
        title="Popular"
        isActive
        onItemClick={vi.fn()}
      />,
    );

    const item = screen.getByText('Popular');

    expect(item).toHaveClass('places__option');
    expect(item).toHaveClass('places__option--active');
  });

  it('should render inactive item', () => {
    render(
      <SortItem
        title="Popular"
        isActive={false}
        onItemClick={vi.fn()}
      />,
    );

    const item = screen.getByText('Popular');

    expect(item).toHaveClass('places__option');
    expect(item).not.toHaveClass('places__option--active');
  });

  it('should call onItemClick with sort type when clicked', async () => {
    const handleItemClick = vi.fn();

    render(
      <SortItem
        title="Popular"
        isActive={false}
        onItemClick={handleItemClick}
      />,
    );

    await userEvent.click(screen.getByText('Popular'));

    expect(handleItemClick).toHaveBeenCalledTimes(1);
    expect(handleItemClick).toHaveBeenCalledWith('Popular');
  });
});
