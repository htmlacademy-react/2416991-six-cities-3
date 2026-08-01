import { Offer, OfferPreview, Review } from '../types/offer';
import { City, SortType } from '../types/common';
import { AuthStatus, Route } from '../types/infrastructure';
import { createAction } from '@reduxjs/toolkit';
import { UserData } from '../types/user-data';

export const setCurrentCity = createAction<City>('city/setCurrent');

export const loadOffers = createAction<OfferPreview[]>('offers/loadAll');

export const setIsOffersLoading = createAction<boolean>('offers/offersLoading');

export const setActiveOfferId = createAction<null | OfferPreview['id']>('offers/activeOfferOnMap');

export const setOffer = createAction<Offer | null>('offers/setSpecified');

export const setIsOfferLoading = createAction<boolean>(
  'offers/specifiedOfferLoading',
);

export const setNearOffers = createAction<OfferPreview[]>('offers/setNear');

export const setIsNearOffersLoading = createAction<boolean>(
  'offers/nearOffersLoading',
);

export const setReviews = createAction<Review[]>('offers/setReviews');

export const setFavorites = createAction<OfferPreview[]>(
  'offers/setFavorites',
);

export const setSortType = createAction<SortType>('sort/set');

export const setAuthorizationStatus =
  createAction<AuthStatus>('user/setAuthStatus');

export const setUser = createAction<UserData | null>('user/setUserInfo');

export const redirectToRoute = createAction<Route>('game/redirectToRoute');
