import { NameSpace } from '../../../const/infrastructure';
import { OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';
import { prepareOffers } from '../../utils';

type OffersLoadingStatus = {
  isOffersLoading: boolean;
  isOffersLoadingError: boolean;
};

export const getOffers = (state: State): OfferPreview[] => {
  const offers = state[NameSpace.Offers].offers;
  const city = state[NameSpace.App].currentCity;
  const sortOption = state[NameSpace.App].sortOption;
  return prepareOffers(offers, city, sortOption);
};

export const getOffersLoadingStatus = (state: State): OffersLoadingStatus => ({
  isOffersLoading: state[NameSpace.Offers].isOffersLoading,
  isOffersLoadingError: state[NameSpace.Offers].isOffersLoadingError,
});

export const getIsOffersLoadingError = (state: State): boolean =>
  state[NameSpace.Offers].isOffersLoadingError;

