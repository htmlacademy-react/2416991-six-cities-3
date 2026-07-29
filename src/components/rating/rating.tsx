import { Block } from '../../const/common';
import { BlockName } from '../../types/common';
import { Offer } from '../../types/offer';

type RatingProps = { block?: BlockName } & Pick<Offer, 'rating'>;

function Rating({
  block = Block.PLACE_CARD,
  rating,
}: RatingProps): JSX.Element {

  const width = `${(rating / 5) * 100}%`;
  return (
    <div className={`${block}__rating rating`}>
      <div className={`${block}__stars rating__stars`}>
        <span style={{ width }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {block === Block.OFFER && (
        <span className={`${block}__rating-value rating__value`}>{rating}</span>
      )}
    </div>
  );
}

export default Rating;
