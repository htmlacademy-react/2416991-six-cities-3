import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import Offer from './offer';
import useOfferPage from '../../hooks/use-offer-page';
import {
  makeFakeOffer,
  makeFakeOfferPreview,
  makeFakeReview,
} from '../../utils/mocks';

vi.mock('../../hooks/use-offer-page');

vi.mock('../../components/near-offers/near-offers', () => ({
  default: () => <div data-testid="near-offers" />,
}));

vi.mock('../../components/offer-features/offer-features', () => ({
  default: () => <div data-testid="offer-features" />,
}));

vi.mock('../../components/offer-gallery/offer-gallery', () => ({
  default: () => <div data-testid="offer-gallery" />,
}));

vi.mock('../../components/offer-goods/offer-goods', () => ({
  default: () => <div data-testid="offer-goods" />,
}));

vi.mock('../../components/offer-heading/offer-heading', () => ({
  default: () => <div data-testid="offer-heading" />,
}));

vi.mock('../../components/offer-host/offer-host', () => ({
  default: () => <div data-testid="offer-host" />,
}));

vi.mock('../../components/offer-price/offer-price', () => ({
  default: () => <div data-testid="offer-price" />,
}));

vi.mock('../../components/rating/rating', () => ({
  default: () => <div data-testid="rating" />,
}));

vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map" />,
}));

vi.mock('../../components/scroll-to-top/scroll-to-top', () => ({
  ScrollToTop: () => <div data-testid="scroll-to-top" />,
}));

vi.mock('../../components/spinner/spinner', () => ({
  default: () => <div data-testid="spinner" />,
}));

vi.mock('../../components/offer-reviews/offer-reviews', () => ({
  default: () => <div data-testid="offer-reviews" />,
}));

const mockedUseOfferPage = vi.mocked(useOfferPage);

const renderOffer = () =>
  render(
    <MemoryRouter>
      <HelmetProvider>
        <Offer />
      </HelmetProvider>
    </MemoryRouter>,
  );

describe('Page: Offer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render spinner while offer is loading', () => {
    mockedUseOfferPage.mockReturnValue({
      offer: null,
      reviews: [],
      nearOffers: [],
      mapOffers: [],
      isOfferLoading: true,
      isNearOffersLoading: false,
    });

    renderOffer();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render nothing when offer is not found', () => {
    mockedUseOfferPage.mockReturnValue({
      offer: null,
      reviews: [],
      nearOffers: [],
      mapOffers: [],
      isOfferLoading: false,
      isNearOffersLoading: false,
    });

    renderOffer();

    expect(screen.queryByTestId('offer-gallery')).not.toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should render offer page', () => {
    const offer = makeFakeOffer();
    const reviews = [makeFakeReview()];
    const nearOffers = [makeFakeOfferPreview()];
    const mapOffers = [...nearOffers, offer];

    mockedUseOfferPage.mockReturnValue({
      offer,
      reviews,
      nearOffers,
      mapOffers,
      isOfferLoading: false,
      isNearOffersLoading: false,
    });

    renderOffer();

    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('offer-heading')).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getByTestId('offer-features')).toBeInTheDocument();
    expect(screen.getByTestId('offer-price')).toBeInTheDocument();
    expect(screen.getByTestId('offer-goods')).toBeInTheDocument();
    expect(screen.getByTestId('offer-host')).toBeInTheDocument();
    expect(screen.getByTestId('offer-reviews')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('near-offers')).toBeInTheDocument();
  });

  it('should render spinner while near offers are loading', () => {
    const offer = makeFakeOffer();

    mockedUseOfferPage.mockReturnValue({
      offer,
      reviews: [],
      nearOffers: [],
      mapOffers: [offer],
      isOfferLoading: false,
      isNearOffersLoading: true,
    });

    renderOffer();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
    expect(screen.queryByTestId('near-offers')).not.toBeInTheDocument();
  });

  it('should render map and near offers after near offers are loaded', () => {
    const offer = makeFakeOffer();
    const nearOffers = [makeFakeOfferPreview()];
    const mapOffers = [...nearOffers, offer];

    mockedUseOfferPage.mockReturnValue({
      offer,
      reviews: [],
      nearOffers,
      mapOffers,
      isOfferLoading: false,
      isNearOffersLoading: false,
    });

    renderOffer();

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('near-offers')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
