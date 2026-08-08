import { NameSpace } from '../../../const/infrastructure';
import { OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';

export const getFavorites = (state: State): OfferPreview[] =>
  state[NameSpace.Favorites].favoriteOffers;
