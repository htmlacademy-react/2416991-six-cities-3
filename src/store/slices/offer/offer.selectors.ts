import { NameSpace } from '../../../const/infrastructure';
import { Offer, OfferPreview } from '../../../types/offer';
import { OfferStatus, State } from '../../../types/state';

export const getOffer = (state: State): Offer | null =>
  state[NameSpace.Offer].offer;

export const getOfferStatus = (state: State): OfferStatus => ({
  isOfferLoading: state[NameSpace.Offer].isOfferLoading,
  isOfferLoadingError: state[NameSpace.Offer].isOfferLoadingError,
  offerLoadingErrorCode: state[NameSpace.Offer].offerLoadingErrorCode,
});

export const getNearOffers = (state: State): OfferPreview[] =>
  state[NameSpace.Offer].nearOffers;

export const getIsNearOffersLoading = (state: State): boolean =>
  state[NameSpace.Offer].isNearOffersLoading;
