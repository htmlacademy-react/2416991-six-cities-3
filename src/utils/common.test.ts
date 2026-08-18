import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { capitalize, getRandomElement } from './common.ts';

describe('Common Utils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a lowercase word', () => {
      expect(capitalize('paris')).toBe('Paris');
    });

    it('should keep the first letter capitalized if it is already uppercase', () => {
      expect(capitalize('Paris')).toBe('Paris');
    });

    it('should work correctly with single-letter strings', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should return empty string when passed empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('getRandomElement', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should return undefined when passed an empty array', () => {
      const result = getRandomElement([]);
      expect(result).toBeUndefined();
    });

    it('should return the first element when Math.random returns 0', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0);
      const items = ['first', 'second', 'third'];

      const result = getRandomElement(items);

      expect(result).toBe('first');
    });

    it('should return the last element when Math.random is close to 1', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.999);
      const items = ['first', 'second', 'third'];

      const result = getRandomElement(items);

      expect(result).toBe('third');
    });

    it('should return an element from the array', () => {
      const items = [10, 20, 30, 40];
      const result = getRandomElement(items);

      expect(items).toContain(result);
    });
  });
});
