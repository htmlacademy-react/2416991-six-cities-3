import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultCity, SortOption } from '../../../const/business';
import { AppState } from '../../../types/state';
import { NameSpace } from '../../../const/infrastructure';
import { City, SortType } from '../../../types/common';
import { OfferPreview } from '../../../types/offer';
import { clearOfferPage } from '../offer/offer.slice';

const initialState: AppState = {
  currentCity: DefaultCity,
  sortOption: SortOption.POPULAR,
  activeOfferId: null,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sortOption = action.payload;
    },
    setActiveOfferId: (
      state,
      action: PayloadAction<OfferPreview['id'] | null>,
    ) => {
      state.activeOfferId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(clearOfferPage, (state) => {
      state.activeOfferId = null;
    });
  },
});

export const { setCurrentCity, setSort, setActiveOfferId } = appSlice.actions;
