import { createAction } from '@reduxjs/toolkit';
import { OfferPreview } from '../types/offer';
import { City } from '../types/common';

export const setCurrentCity = createAction<City>('city/setCurrent');

export const loadOffers = createAction<OfferPreview[]>('offers/set');
