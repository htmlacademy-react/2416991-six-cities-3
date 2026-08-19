import { NameSpace } from '../../../const/infrastructure';
import { City, SortType } from '../../../types/common';
import { OfferPreview } from '../../../types/offer';
import { State } from '../../../types/state';

export const getCurrentCity = (state: Pick<State, NameSpace.App>): City =>
  state[NameSpace.App].currentCity;

export const getSort = (state: Pick<State, NameSpace.App>): SortType =>
  state[NameSpace.App].sortOption;

export const getActiveOffId = (state: Pick<State, NameSpace.App>): OfferPreview['id'] | null =>
  state[NameSpace.App].activeOfferId;

