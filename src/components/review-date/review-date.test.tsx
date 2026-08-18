import { render, screen } from '@testing-library/react';
import faker from 'faker';
import { describe, expect, it } from 'vitest';
import ReviewDate from './review-date';

describe('Component: ReviewDate', () => {
  it('should render time element with correct text content and dateTime attribute', () => {
    const mockDate = '2026-04-15T12:00:00.000Z';

    render(<ReviewDate date={mockDate} />);

    const timeElement = screen.getByText('April 2026');

    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '2026-04-15');
  });

  it('should handle randomly generated valid ISO dates with faker', () => {
    const randomIsoDate = faker.date.past().toISOString();

    const { container } = render(<ReviewDate date={randomIsoDate} />);

    const timeElement = container.querySelector('time');

    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime');
    expect(timeElement?.textContent).not.toBe('');
  });
});
