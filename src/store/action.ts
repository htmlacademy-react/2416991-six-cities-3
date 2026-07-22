import { createAction } from '@reduxjs/toolkit';
import { OfferPreview } from '../types/offer';
import { City, SortType } from '../types/common';

export const setCurrentCity = createAction<City>('city/setCurrent');

export const loadOffers = createAction<OfferPreview[]>('offers/set');

export const setSortType = createAction<SortType>('sort/set');
