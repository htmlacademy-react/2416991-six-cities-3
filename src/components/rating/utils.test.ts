import { describe, expect, it } from 'vitest';
import { getStarsWidth } from './utils';

describe('Utils: getStarsWidth', () => {
  it('should calculate correct percentage for integer ratings', () => {
    expect(getStarsWidth(5)).toBe('100%');
    expect(getStarsWidth(4)).toBe('80%');
    expect(getStarsWidth(1)).toBe('20%');
    expect(getStarsWidth(0)).toBe('0%');
  });

  it('should round fractional rating to nearest integer and calculate percentage', () => {
    expect(getStarsWidth(3.6)).toBe('80%');
    expect(getStarsWidth(3.5)).toBe('80%');
    expect(getStarsWidth(3.4)).toBe('60%');
  });
});
