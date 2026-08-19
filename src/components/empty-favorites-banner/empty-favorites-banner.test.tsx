import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EmptyFavoritesBanner from './empty-favorites-banner';

describe('Component: EmptyFavoritesBanner', () => {
  it('should render correctly', () => {
    render(<EmptyFavoritesBanner />);
    const status = screen.getByText('Nothing yet saved.');
    const message = screen.getByText(
      'Save properties to narrow down search or plan your future trips.',
    );

    expect(status).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
