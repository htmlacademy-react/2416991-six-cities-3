import { NameSpace } from '../../../const/infrastructure';
import { Review } from '../../../types/offer';
import { State } from '../../../types/state';

export const getReviews = (state: Pick<State, NameSpace.Reviews>): Review[] =>
  state[NameSpace.Reviews].reviews;

export const getIsReviewPosting = (state: Pick<State, NameSpace.Reviews>): boolean =>
  state[NameSpace.Reviews].isPosting;
