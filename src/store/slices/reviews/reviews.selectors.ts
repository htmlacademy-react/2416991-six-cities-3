import { NameSpace } from '../../../const/infrastructure';
import { Review } from '../../../types/offer';
import { State } from '../../../types/state';

export const getReviews = (state: State): Review[] =>
  state[NameSpace.Reviews].reviews;
