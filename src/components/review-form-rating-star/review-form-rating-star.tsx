import { memo } from 'react';

type ReviewFormRatingStarProps = {
  value: string;
  title: string;
  checked: boolean;
  disabled: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

function ReviewFormRatingStar({
  value,
  title,
  checked,
  disabled,
  onChange,
}: ReviewFormRatingStarProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
        style={{ pointerEvents: disabled ? 'none' : 'auto' }}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

const MemoizedReviewFormRatingStar = memo(ReviewFormRatingStar);

export default MemoizedReviewFormRatingStar;
