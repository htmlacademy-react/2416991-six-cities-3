import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

import useReviewForm from './use-review-form';
import { withStore } from '../utils/mock-component';

vi.mock('react-toastify', () => ({
  toast: {
    warn: vi.fn(),
  },
}));

describe('Hook: useReviewForm', () => {
  const renderReviewFormHook = () => {
    const { mockStore } = withStore(<div></div>);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/offer/123']}>
          <Routes>
            <Route path="/offer/:id" element={children} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    return {
      ...renderHook(() => useReviewForm(), { wrapper }),
      mockStore,
    };
  };

  it('should return initial state', () => {
    const { result } = renderReviewFormHook();

    expect(result.current.formData).toEqual({
      comment: '',
      rating: 0,
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isValid).toBe(false);
  });

  it('should change rating', () => {
    const { result } = renderReviewFormHook();

    act(() => {
      result.current.handleRatingChange({
        target: { value: '5' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.rating).toBe(5);
  });

  it('should change comment', () => {
    const { result } = renderReviewFormHook();

    act(() => {
      result.current.handleTextChange({
        target: { value: 'Very nice apartment' },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.formData.comment).toBe('Very nice apartment');
  });

  it('should return true when form is valid', () => {
    const { result } = renderReviewFormHook();

    act(() => {
      result.current.handleRatingChange({
        target: { value: '5' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleTextChange({
        target: {
          value: 'This is a very nice apartment with a great location.',
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.isValid).toBe(true);
  });

  it('should not submit invalid form', () => {
    const { result } = renderReviewFormHook();

    const preventDefault = vi.fn();

    act(() => {
      result.current.handleSubmit({
        preventDefault,
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it('should submit valid form successfully and reset state', async () => {
    const { result, mockStore } = renderReviewFormHook();

    mockStore.dispatch = vi.fn().mockReturnValue({
      unwrap: () => Promise.resolve(),
    });

    act(() => {
      result.current.handleRatingChange({
        target: { value: '5' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleTextChange({
        target: {
          value: 'This is a very nice apartment with a great location.',
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    await act(async () => {});

    expect(result.current.formData).toEqual({
      comment: '',
      rating: 0,
    });
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle error when submit fails', async () => {
    const { result, mockStore } = renderReviewFormHook();

    mockStore.dispatch = vi.fn().mockReturnValue({
      unwrap: () => Promise.reject(new Error('Submit error')),
    });

    act(() => {
      result.current.handleRatingChange({
        target: { value: '5' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleTextChange({
        target: {
          value: 'This is a very nice apartment with a great location.',
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    await act(async () => {});

    expect(toast.warn).toHaveBeenCalledWith(
      'A technical error occurred while submitting the form; please try again later.',
    );
    expect(result.current.isSubmitting).toBe(false);
  });
});
