import { createSlice } from '@reduxjs/toolkit';
import { FavoritesState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import { fetchFavoritesAction } from '../../api-actions';

const initialState: FavoritesState = {
  favoriteOffers: [],
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favoriteOffers = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.favoriteOffers = action.payload;
    });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
