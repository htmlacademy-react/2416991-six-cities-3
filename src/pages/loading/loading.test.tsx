import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Loading from './loading';

vi.mock('../../components/spinner/spinner', () => ({
  default: () => <div>Spinner</div>,
}));

describe('Page: Loading', () => {
  it('should render loading page', () => {
    render(<Loading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Spinner')).toBeInTheDocument();
  });
});
