import { describe, expect, it } from 'vitest';
import { formatToServerDate, humanizeDate } from './utils';

describe('Utils: ReviewDate helper functions', () => {
  describe('humanizeDate', () => {
    it('should format valid ISO date string to "Month Year" in en-US locale', () => {
      const validDate = '2023-04-15T12:00:00.000Z';
      expect(humanizeDate(validDate)).toBe('April 2023');
    });

    it('should return empty string when date is invalid', () => {
      expect(humanizeDate('invalid-date')).toBe('');
    });
  });

  describe('formatToServerDate', () => {
    it('should format valid ISO date string to YYYY-MM-DD format', () => {
      const validDate = '2023-04-15T12:00:00.000Z';
      expect(formatToServerDate(validDate)).toBe('2023-04-15');
    });

    it('should return empty string when date is invalid', () => {
      expect(formatToServerDate('not-a-date')).toBe('');
    });
  });
});
