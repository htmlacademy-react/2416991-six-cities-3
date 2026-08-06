import { NameSpace } from '../../../const/infrastructure';
import { AuthStatus } from '../../../types/infrastructure';
import { State } from '../../../types/state';
import { UserData } from '../../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthStatus =>
  state[NameSpace.User].authorizationStatus;

export const getUserInfo = (state: State): UserData | null =>
  state[NameSpace.User].userInfo;
