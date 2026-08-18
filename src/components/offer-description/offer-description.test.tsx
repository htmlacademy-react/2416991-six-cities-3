import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OfferDescription from './offer-description';

describe('Component: OfferDescription', () => {
  it('should render all sentences as separate paragraphs', () => {
    const description = 'First sentence. Second sentence';

    render(<OfferDescription description={description} />);

    expect(screen.getByText(/First sentence/i)).toBeInTheDocument();
    expect(screen.getByText(/Second sentence/i)).toBeInTheDocument();
  });

  it('should render correct number of paragraph elements', () => {
    const description = 'First sentence. Second sentence. Third sentence';

    const { container } = render(
      <OfferDescription description={description} />,
    );

    const paragraphs = container.querySelectorAll('.offer__text');

    expect(paragraphs).toHaveLength(3);
  });
});
