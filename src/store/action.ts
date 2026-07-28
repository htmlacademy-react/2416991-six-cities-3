import { OfferPreview } from '../types/offer';
import { City, SortType } from '../types/common';
import { AuthStatus } from '../types/infrastructure';
import { createAction } from '@reduxjs/toolkit';
import { UserData } from '../types/user-data';

export const setCurrentCity = createAction<City>('city/setCurrent');

export const loadOffers = createAction<OfferPreview[]>('offers/loadAll');

export const setIsLoading = createAction<boolean>('offers/loadSuccess');

export const setFavorites = createAction<OfferPreview[]>('offers/setFavorites');

export const setSortType = createAction<SortType>('sort/set');

export const setAuthorizationStatus =
  createAction<AuthStatus>('user/setAuthStatus');

export const setError = createAction<string | null>('data/setError');

export const setUser = createAction<UserData>('user/setUserInfo');
