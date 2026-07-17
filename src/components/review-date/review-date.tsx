import { Review } from '../../types/offer';
import { formatToServerDate, humanizeDate } from './utils';

type ReviewDateProps = Pick<Review, 'date'>;

function ReviewDate({ date }: ReviewDateProps): JSX.Element {
  return (
    <time className="reviews__date" dateTime={formatToServerDate(date)}>
      {humanizeDate(date)}
    </time>
  );
}

export default ReviewDate;
