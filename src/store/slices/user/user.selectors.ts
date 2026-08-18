import { NameSpace } from '../../../const/infrastructure';
import { AuthStatus } from '../../../types/infrastructure';
import { State } from '../../../types/state';
import { UserData } from '../../../types/user-data';

export const getAuthorizationStatus = (
  state: Pick<State, NameSpace.User>,
): AuthStatus => state[NameSpace.User].authorizationStatus;

export const getUserInfo = (
  state: Pick<State, NameSpace.User>,
): UserData | null => state[NameSpace.User].userInfo;
