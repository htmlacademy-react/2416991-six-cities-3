import { NameSpace } from '../../../const/infrastructure';
import { City, SortType } from '../../../types/common';
import { OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';

export const getCurrentCity = (state: State): City =>
  state[NameSpace.App].currentCity;

export const getSort = (state: State): SortType =>
  state[NameSpace.App].sortOption;

export const getActiveOffId = (state: State): OfferPreview['id'] | null =>
  state[NameSpace.App].activeOfferId;

