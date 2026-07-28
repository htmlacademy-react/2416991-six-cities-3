import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import {
  APIRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR,
} from '../const/infrastructure';
import {
  loadOffers,
  setAuthorizationStatus,
  setError,
  setIsLoading,
  setUser,
} from './action';
import { OfferPreview } from '../types/offer';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  dispatch(loadOffers(data));
  dispatch(setIsLoading(false));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
});

export const clearErrorAction = createAsyncThunk('game/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
