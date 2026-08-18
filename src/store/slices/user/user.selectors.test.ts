import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { NameSpace, AuthorizationStatus } from '../../../const/infrastructure';
import { UserData } from '../../../types/user-data';
import { getAuthorizationStatus, getUserInfo } from './user.selectors';

const createMockUserData = (): UserData => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  token: faker.datatype.uuid(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
});

describe('User selectors', () => {
  const mockUserData = createMockUserData();

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUserData,
    },
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return user info from state', () => {
    const { userInfo } = state[NameSpace.User];
    const result = getUserInfo(state);
    expect(result).toEqual(userInfo);
  });
});
