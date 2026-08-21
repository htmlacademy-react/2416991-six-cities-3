import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ReviewForm from './review-form';
import useReviewForm from '../../hooks/use-review-form';
import { MIN_REVIEW_CHARACTERS } from '../../const/business';

vi.mock('../../hooks/use-review-form');

const mockedUseReviewForm = vi.mocked(useReviewForm);

describe('Component: ReviewForm', () => {
  const mockHandleRatingChange = vi.fn();
  const mockHandleTextChange = vi.fn();
  const mockHandleSubmit = vi.fn();

  const getDefaultHookResult = () => ({
    formData: {
      comment: '',
      rating: 0,
    },
    isValid: false,
    isSubmitting: false,
    handleRatingChange: mockHandleRatingChange,
    handleTextChange: mockHandleTextChange,
    handleSubmit: mockHandleSubmit,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseReviewForm.mockReturnValue(getDefaultHookResult());
  });

  it('should render form with initial state', () => {
    render(<ReviewForm />);

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: 'Your review' })).toHaveValue(
      '',
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();

    expect(
      screen.getByText(`${MIN_REVIEW_CHARACTERS} characters`),
    ).toBeInTheDocument();
  });

  it('should render entered comment', () => {
    mockedUseReviewForm.mockReturnValue({
      ...getDefaultHookResult(),
      formData: {
        comment: 'This is a very nice apartment.',
        rating: 0,
      },
    });

    render(<ReviewForm />);

    expect(screen.getByRole('textbox', { name: 'Your review' })).toHaveValue(
      'This is a very nice apartment.',
    );
  });

  it('should enable submit button when form is valid', () => {
    mockedUseReviewForm.mockReturnValue({
      ...getDefaultHookResult(),
      formData: {
        comment: 'This is a valid review.',
        rating: 5,
      },
      isValid: true,
    });

    render(<ReviewForm />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('should call handleSubmit when form is submitted', async () => {
    mockedUseReviewForm.mockReturnValue({
      ...getDefaultHookResult(),
      formData: {
        comment: 'This is a valid review.',
        rating: 5,
      },
      isValid: true,
    });

    render(<ReviewForm />);

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should disable form controls while submitting', () => {
    mockedUseReviewForm.mockReturnValue({
      ...getDefaultHookResult(),
      formData: {
        comment: 'This is a valid review.',
        rating: 5,
      },
      isValid: true,
      isSubmitting: true,
    });

    render(<ReviewForm />);

    expect(
      screen.getByRole('button', { name: 'Submitting...' }),
    ).toBeDisabled();

    expect(screen.getByRole('textbox', { name: 'Your review' })).toBeDisabled();

    const ratingInputs = screen.getAllByRole('radio');

    ratingInputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('should display selected rating', () => {
    mockedUseReviewForm.mockReturnValue({
      ...getDefaultHookResult(),
      formData: {
        comment: '',
        rating: 4,
      },
    });

    render(<ReviewForm />);

    const selectedRating = screen
      .getAllByRole('radio')
      .find((input) => (input as HTMLInputElement).value === '4');

    expect(selectedRating).toBeChecked();
  });
});
