import { render, screen } from '@testing-library/react';
import faker from 'faker';
import { describe, expect, it } from 'vitest';
import OfferHost from './offer-host';

describe('Component: OfferHost', () => {
  const mockHost = {
    name: faker.name.findName(),
    avatarUrl: faker.internet.avatar(),
    description: 'A quiet cozy night. Near the river.',
  };

  it('should render host info and description correctly when isPro is false', () => {
    render(
      <OfferHost
        name={mockHost.name}
        avatarUrl={mockHost.avatarUrl}
        isPro={false}
        description={mockHost.description}
      />
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Meet the host' })
    ).toBeInTheDocument();

    const avatarImg = screen.getByRole('img', { name: 'Host avatar' });
    expect(avatarImg).toHaveAttribute('src', mockHost.avatarUrl);

    expect(screen.getByText(mockHost.name)).toBeInTheDocument();

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();

    expect(screen.getByText(/A quiet cozy night/i)).toBeInTheDocument();
  });

  it('should render Pro status and active class when isPro is true', () => {
    render(
      <OfferHost
        name={mockHost.name}
        avatarUrl={mockHost.avatarUrl}
        isPro
        description={mockHost.description}
      />
    );

    expect(screen.getByText('Pro')).toBeInTheDocument();

    const avatarImg = screen.getByRole('img', { name: 'Host avatar' });
    expect(avatarImg.parentElement).toHaveClass('offer__avatar-wrapper--pro');
  });
});
