import { describe, it, expect } from 'vitest';
import { NameSpace } from '../../../const/infrastructure';
import { getActiveOffId, getCurrentCity, getSort } from './app.selectors';
import { DefaultCity, SortOption } from '../../../const/business';

describe('App selectors', () => {
  const state = {
    [NameSpace.App]: {
      currentCity: DefaultCity,
      sortOption: SortOption.POPULAR,
      activeOfferId: 'test-active-offer-id',
    },
  };

  it('should return current city from state', () => {
    const { currentCity } = state[NameSpace.App];
    const result = getCurrentCity(state);
    expect(result).toEqual(currentCity);
  });

  it('should return sort option from state', () => {
    const { sortOption } = state[NameSpace.App];
    const result = getSort(state);
    expect(result).toBe(sortOption);
  });

  it('should return active offer id from state', () => {
    const { activeOfferId } = state[NameSpace.App];
    const result = getActiveOffId(state);
    expect(result).toBe(activeOfferId);
  });
});
