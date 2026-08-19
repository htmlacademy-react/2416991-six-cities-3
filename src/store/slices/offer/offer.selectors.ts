import { NameSpace } from '../../../const/infrastructure';
import { Offer, OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';

export const getOffer = (state: Pick<State, NameSpace.Offer>): Offer | null =>
  state[NameSpace.Offer].offer;

export const getNearOffers = (state: Pick<State, NameSpace.Offer>): OfferPreview[] =>
  state[NameSpace.Offer].nearOffers;

export const getIsOfferLoading = (state: Pick<State, NameSpace.Offer>): boolean =>
  state[NameSpace.Offer].isOfferLoading;

export const getIsOfferLoadingError = (state: Pick<State, NameSpace.Offer>): boolean =>
  state[NameSpace.Offer].isOfferLoadingError;

export const getOfferLoadingErrorCode = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].offerLoadingErrorCode;

export const getIsNearOffersLoading = (state: Pick<State, NameSpace.Offer>): boolean =>
  state[NameSpace.Offer].isNearOffersLoading;
