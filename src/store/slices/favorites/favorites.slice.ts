import { createSlice } from '@reduxjs/toolkit';
import { FavoritesState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import {
  changeFavoriteStatusAction,
  fetchFavoritesAction,
} from '../../api-actions';

const initialState: FavoritesState = {
  favoriteOffers: [],
  isFavoritesLoading: true,
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favoriteOffers = [];
      state.isFavoritesLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(
            (offer) => offer.id !== action.payload.id,
          );
        }
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
