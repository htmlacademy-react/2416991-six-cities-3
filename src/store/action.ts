import { createAction } from '@reduxjs/toolkit';
import { OfferPreview } from '../types/offer';
import { City, SortType } from '../types/common';
import { AuthStatus } from '../types/infrastructure';

export const setCurrentCity = createAction<City>('city/setCurrent');

export const loadOffers = createAction<OfferPreview[]>('offers/load-all');

export const setSortType = createAction<SortType>('sort/set');

export const setAuthorizationStatus =
  createAction<AuthStatus>('user/setAuthStatus');
