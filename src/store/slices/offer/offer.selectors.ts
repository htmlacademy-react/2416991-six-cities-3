import { NameSpace } from '../../../const/infrastructure';
import { Offer, OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';

export const getOffer = (state: State): Offer | null =>
  state[NameSpace.Offer].offer;

export const getNearOffers = (state: State): OfferPreview[] =>
  state[NameSpace.Offer].nearOffers;

export const getIsOfferLoading = (state: State): boolean =>
  state[NameSpace.Offer].isOfferLoading;

export const getIsOfferLoadingError = (state: State): boolean =>
  state[NameSpace.Offer].isOfferLoadingError;

export const getOfferLoadingErrorCode = (state: State) =>
  state[NameSpace.Offer].offerLoadingErrorCode;

export const getIsNearOffersLoading = (state: State): boolean =>
  state[NameSpace.Offer].isNearOffersLoading;
