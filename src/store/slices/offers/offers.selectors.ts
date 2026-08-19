import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/infrastructure';
import { OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';
import { prepareOffers } from '../../utils';
import { getCurrentCity, getSort } from '../app/app.selectors';

export const getRawOffers = (
  state: Pick<State, NameSpace.Offers>,
): OfferPreview[] => state[NameSpace.Offers].offers;

export const getIsOffersLoading = (
  state: Pick<State, NameSpace.Offers>,
): boolean => state[NameSpace.Offers].isOffersLoading;

export const getIsOffersLoadingError = (
  state: Pick<State, NameSpace.Offers>,
): boolean => state[NameSpace.Offers].isOffersLoadingError;

export const getOffers = createSelector(
  [getRawOffers, getCurrentCity, getSort],
  (offers, city, sortOption) => prepareOffers(offers, city, sortOption),
);
