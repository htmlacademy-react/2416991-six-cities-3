import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import { makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';
import { Offer, OfferPreview } from '../../types/offer';
import faker from 'faker';

const makeFakeOffer = (): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: 200,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  description: faker.lorem.paragraph(),
  images: [faker.image.imageUrl()],
  goods: ['Wi-Fi'],
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: true,
  },
  bedroomsQuantity: 2,
  maxAdults: 3,
});

const makeFakeOfferPreview = (id?: string): OfferPreview => ({
  id: id || faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  previewImage: faker.image.imageUrl(),
});

describe('Application Routing', () => {
  it('should render "Main" page when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, [AppRoute.Root]);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "Login" page when user navigates to "/login" and is NOT authorized', () => {
    const withHistoryComponent = withHistory(<App />, [AppRoute.Login]);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(
      screen.getByRole('heading', { name: /Sign in/i }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should redirect from "/login" to "/" when user is ALREADY authorized (onlyNoAuth guard)', () => {
    const withHistoryComponent = withHistory(<App />, [AppRoute.Login]);
    const fakeUserData = {
      name: 'John',
      email: 'john@test.com',
      token: '12345',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    };

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: fakeUserData,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Sign in/i }),
    ).not.toBeInTheDocument();
  });

  it('should render "Favorites" page when user navigates to "/favorites" and IS authorized and have no favorites', () => {
    const withHistoryComponent = withHistory(<App />, [AppRoute.Favorites]);
    const fakeUserData = {
      name: 'John',
      email: 'john@test.com',
      token: '12345',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    };

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: fakeUserData,
        },
        FAVORITES: {
          favoriteOffers: [],
          isFavoritesLoading: false,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should redirect from "/favorites" to "/login" when user is NOT authorized', () => {
    const withHistoryComponent = withHistory(<App />, [AppRoute.Favorites]);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
        },
        FAVORITES: {
          favoriteOffers: [],
          isFavoritesLoading: false,
        },
      }),
    );

    render(withStoreComponent);

    expect(
      screen.getByRole('button', { name: /Sign in/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
  });

  it('should render "Offer" page when user navigates to "/offer/:id"', () => {
    const withHistoryComponent = withHistory(<App />, [
      `${AppRoute.Offer}/test-offer-id`,
    ]);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
        },
        OFFER: {
          offer: makeFakeOffer(),
          isOfferLoading: false,
          isOfferLoadingError: false,
          offerLoadingErrorCode: null,
          nearOffers: [
            makeFakeOfferPreview(),
            makeFakeOfferPreview(),
            makeFakeOfferPreview(),
          ],
          isNearOffersLoading: false,
        },
      }),
    );

    render(withStoreComponent);

    expect(
      screen.getByText(/Other places in the neighbourhood/i),
    ).toBeInTheDocument();
  });

  it('should render "NotFound" page when user navigates to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, [
      '/some-non-existent-route',
    ]);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText(/Oops! That page does not exist/i)).toBeInTheDocument();
  });

  it('should render "Loading" screen when authorizationStatus is Unknown', () => {
    const withHistoryComponent = withHistory(<App />, [AppRoute.Root]);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Unknown,
          userInfo: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
