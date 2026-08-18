import { describe, it, expect } from 'vitest';
import {
  MIN_REVIEW_CHARACTERS,
  MAX_REVIEW_CHARACTERS,
} from '../../const/business';
import { validateReviewForm } from './utils';

describe('validateReviewForm', () => {
  const validRating = 5;

  it('should return true for valid comment length and non-zero rating', () => {
    const validFormData = {
      comment: 'a'.repeat(100),
      rating: validRating,
    };

    expect(validateReviewForm(validFormData)).toBe(true);
  });

  describe('Boundary checks for comment length', () => {
    it(`should return true when comment length is exactly MIN_REVIEW_CHARACTERS (${MIN_REVIEW_CHARACTERS})`, () => {
      const boundaryFormData = {
        comment: 'a'.repeat(MIN_REVIEW_CHARACTERS),
        rating: validRating,
      };

      expect(validateReviewForm(boundaryFormData)).toBe(true);
    });

    it(`should return true when comment length is exactly MAX_REVIEW_CHARACTERS (${MAX_REVIEW_CHARACTERS})`, () => {
      const boundaryFormData = {
        comment: 'a'.repeat(MAX_REVIEW_CHARACTERS),
        rating: validRating,
      };

      expect(validateReviewForm(boundaryFormData)).toBe(true);
    });

    it(`should return false when comment length is less than MIN_REVIEW_CHARACTERS (${MIN_REVIEW_CHARACTERS - 1})`, () => {
      const invalidFormData = {
        comment: 'a'.repeat(MIN_REVIEW_CHARACTERS - 1),
        rating: validRating,
      };

      expect(validateReviewForm(invalidFormData)).toBe(false);
    });

    it(`should return false when comment length is greater than MAX_REVIEW_CHARACTERS (${MAX_REVIEW_CHARACTERS + 1})`, () => {
      const invalidFormData = {
        comment: 'a'.repeat(MAX_REVIEW_CHARACTERS + 1),
        rating: validRating,
      };

      expect(validateReviewForm(invalidFormData)).toBe(false);
    });

    it('should return false when comment is empty', () => {
      const emptyFormData = {
        comment: '',
        rating: validRating,
      };

      expect(validateReviewForm(emptyFormData)).toBe(false);
    });
  });

  describe('Rating checks', () => {
    it('should return false when rating is 0 even with a valid comment', () => {
      const zeroRatingFormData = {
        comment: 'a'.repeat(100),
        rating: 0,
      };

      expect(validateReviewForm(zeroRatingFormData)).toBe(false);
    });

    it('should return false when both rating is 0 and comment length is invalid', () => {
      const completelyInvalidFormData = {
        comment: 'Too short',
        rating: 0,
      };

      expect(validateReviewForm(completelyInvalidFormData)).toBe(false);
    });
  });
});
