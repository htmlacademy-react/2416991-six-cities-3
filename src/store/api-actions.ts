import { AppThunkConfig } from '../types/state';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR,
} from '../const/infrastructure';
import {
  loadOffers,
  setAuthorizationStatus,
  setError,
  setIsNearOffersLoading,
  setIsOfferLoading,
  setIsOffersLoading,
  setNearOffers,
  setOffer,
  setReviews,
  setUser,
} from './action';
import {
  OfferPreview,
  Review,
  ReviewServer,
  ServerOffer,
} from '../types/offer';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { adaptOffer } from './utils';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  AppThunkConfig
>('data/fetchOffers', async (_arg, { dispatch, extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  dispatch(loadOffers(data));
  dispatch(setIsOffersLoading(false));
});

export const fetchOfferAction = createAsyncThunk<
  void,
  OfferPreview['id'],
  AppThunkConfig
>('data/fetchOffer', async (id, { dispatch, extra }) => {
  dispatch(setIsOfferLoading(true));
  const { api, history } = extra;
  try {
    const { data } = await api.get<ServerOffer>(`${APIRoute.Offers}/${id}`);
    const adaptedOffer = adaptOffer(data);
    dispatch(setOffer(adaptedOffer));
  } catch {
    history.push(AppRoute.NotFound);
  } finally {
    dispatch(setIsOfferLoading(false));
  }
});

export const fetchNearOffersAction = createAsyncThunk<
  void,
  OfferPreview['id'],
  AppThunkConfig
>('data/fetchNearOffers', async (id, { dispatch, extra }) => {
  const { api } = extra;
  dispatch(setIsNearOffersLoading(true));
  const { data } = await api.get<OfferPreview[]>(
    `${APIRoute.Offers}/${id}${APIRoute.Nearby}`,
  );
  dispatch(setNearOffers(data));
  dispatch(setIsNearOffersLoading(false));
});

export const fetchReviews = createAsyncThunk<
  void,
  OfferPreview['id'],
  AppThunkConfig
>('data/fetchReviews', async (id, { dispatch, extra }) => {
  const { api } = extra;
  const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
  dispatch(setReviews(data));
});

export const postReview = createAsyncThunk<void, ReviewServer, AppThunkConfig>(
  'data/postReview',
  async ({ id, comment, rating }, { dispatch, extra }) => {
    const { api } = extra;

    await api.post<Review>(`${APIRoute.Comments}/${id}`, { comment, rating });
    dispatch(fetchReviews(id));
  },
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  AppThunkConfig
>('user/checkAuth', async (_arg, { dispatch, extra }) => {
  try {
    const { api } = extra;
    await api.get(APIRoute.Login);
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<void, AuthData, AppThunkConfig>(
  'user/login',
  async ({ email: email, password }, { dispatch, extra }) => {
    const { api } = extra;
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, AppThunkConfig>(
  'user/logout',
  async (_arg, { dispatch, extra }) => {
    const { api } = extra;
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk('game/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
