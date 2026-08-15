import { AppThunkConfig } from '../types/state';
import { APIRoute, FavoriteStatus } from '../const/infrastructure';
import {
  Offer,
  OfferPreview,
  Review,
  ReviewServer,
  ServerFavoriteResponse,
  ServerOffer,
} from '../types/offer';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { adaptFavoriteResponseToPreview, adaptOffer } from './utils';
import axios from 'axios';
import { MAX_NEAR_OFFERS_COUNT } from '../const/business';
import { clearFavorites } from './slices/favorites/favorites.slice';

export const fetchOffersAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  AppThunkConfig
>('data/fetchOffers', async (_arg, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  OfferPreview['id'],
  AppThunkConfig
>('data/fetchOffer', async (id, { extra, rejectWithValue }) => {
  const { api } = extra;
  try {
    const { data } = await api.get<ServerOffer>(`${APIRoute.Offers}/${id}`);
    const adaptedOffer = adaptOffer(data);
    return adaptedOffer;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.statusText,
      });
    }
    return rejectWithValue({
      status: 500,
      message: 'Unknown error',
    });
  }
});

export const fetchNearOffersAction = createAsyncThunk<
  OfferPreview[],
  OfferPreview['id'],
  AppThunkConfig
>('data/fetchNearOffers', async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferPreview[]>(
    `${APIRoute.Offers}/${id}${APIRoute.Nearby}`,
  );
  return data.slice(0, MAX_NEAR_OFFERS_COUNT);
});

export const fetchReviews = createAsyncThunk<
  Review[],
  OfferPreview['id'],
  AppThunkConfig
>('data/fetchReviews', async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const postReview = createAsyncThunk<
  Review,
  ReviewServer,
  AppThunkConfig
>('data/postReview', async ({ id, comment, rating }, { extra }) => {
  const { api } = extra;

  const { data } = await api.post<Review>(`${APIRoute.Comments}/${id}`, {
    comment,
    rating,
  });
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  AppThunkConfig
>('data/fetchFavorites', async (_arg, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferPreview[]>(APIRoute.Favorite);
  return data;
});

export const changeFavoriteStatusAction = createAsyncThunk<
  OfferPreview,
  {
    offerId: OfferPreview['id'];
    status: FavoriteStatus;
  },
  AppThunkConfig
>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { extra, getState }) => {
    const { api } = extra;
    const { data } = await api.post<ServerFavoriteResponse>(
      `${APIRoute.Favorite}/${offerId}/${status}`,
    );

    const state = getState();
    const existingOffer = state?.OFFERS?.offers?.find(
      (item) => item.id === offerId,
    );

    const adaptedPreviewOffer = adaptFavoriteResponseToPreview(
      data,
      status,
      existingOffer?.previewImage,
    );

    return existingOffer
      ? { ...existingOffer, ...adaptedPreviewOffer }
      : adaptedPreviewOffer;
  },
);

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  AppThunkConfig
>('user/checkAuth', async (_arg, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<UserData, AuthData, AppThunkConfig>(
  'user/login',
  async ({ email: email, password }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, AppThunkConfig>(
  'user/logout',
  async (_arg, { dispatch, extra }) => {
    const { api } = extra;
    await api.delete(APIRoute.Logout);
    dispatch(clearFavorites());
    dropToken();
  },
);
