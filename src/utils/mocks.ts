import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { AxiosInstance } from 'axios';
import { DEFAULT_CITY, DEFAULT_SORT_OPTION } from '../const/business';
import { AuthorizationStatus } from '../const/infrastructure';

export type AppThunkDispatch = ThunkDispatch<
  State,
  { api: AxiosInstance },
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  APP: {
    activeOfferId: null,
    currentCity: DEFAULT_CITY,
    sortOption: DEFAULT_SORT_OPTION,
  },
  OFFERS: { offers: [], isOffersLoading: false, isOffersLoadingError: false },
  OFFER: {
    offer: null,
    isOfferLoading: false,
    isOfferLoadingError: false,
    offerLoadingErrorCode: null,
    nearOffers: [],
    isNearOffersLoading: false,
  },
  REVIEWS: { reviews: [], isPosting: false },
  FAVORITES: { favoriteOffers: [], isFavoritesLoading: false },
  USER: { userInfo: null, authorizationStatus: AuthorizationStatus.Unknown },
  ...(initialState ?? {}),
});
