import { Block } from '../../const';
import { BlockName } from '../../types/common';

type RatingProps = {
  block?: BlockName;
  starCount: 1 | 2 | 3 | 4 | 5;
}

function Rating({ block = Block.PLACE_CARD, starCount }: RatingProps): JSX.Element {
  const width = `${(starCount / 5) * 100}%`;
  return (
    <div className={`${block}__rating rating`}>
      <div className={`${block}__stars rating__stars`}>
        <span style={{ width }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className={`${block}__rating-value rating__value`}>4.8</span>
    </div>
  );
}

export default Rating;
