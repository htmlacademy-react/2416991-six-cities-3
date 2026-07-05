type ReviewDateProps = {
  date: string;
};

const humanizeDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const formatToServerDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  return date.toISOString().split('T')[0];
};

function ReviewDate({ date }: ReviewDateProps): JSX.Element {
  return (
    <time className="reviews__date" dateTime={formatToServerDate(date)}>
      {humanizeDate(date)}
    </time>
  );
}

export default ReviewDate;
