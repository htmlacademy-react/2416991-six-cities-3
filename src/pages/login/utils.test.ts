import { Cities, DEFAULT_CITY } from '../../const/business';
import { getRandomElement } from '../../utils/common';
import { getRandomCity } from './utils';

vi.mock('../../utils/common', () => ({
  getRandomElement: vi.fn(),
}));

describe('Function: getRandomCity', () => {
  it('should return random city', () => {
    const randomCity = Cities[0];

    vi.mocked(getRandomElement).mockReturnValue(randomCity);

    expect(getRandomCity()).toEqual(randomCity);
  });

  it('should return default city when random city is not available', () => {
    vi.mocked(getRandomElement).mockReturnValue(undefined);

    expect(getRandomCity()).toEqual(DEFAULT_CITY);
  });
});
