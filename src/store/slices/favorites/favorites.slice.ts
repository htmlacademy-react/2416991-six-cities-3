import { createSlice } from '@reduxjs/toolkit';
import { FavoritesState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import { fetchFavoritesAction } from '../../api-actions';

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
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
