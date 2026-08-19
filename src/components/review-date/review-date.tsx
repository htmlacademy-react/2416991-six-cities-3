import { Review } from '../../types/offer';
import { formatToServerDate, humanizeDate } from './utils';

type ReviewDateProps = Pick<Review, 'date'>;

const ReviewDate = ({ date }: ReviewDateProps): JSX.Element => (
  <time className="reviews__time" dateTime={formatToServerDate(date)}>
    {humanizeDate(date)}
  </time>
);

export default ReviewDate;
