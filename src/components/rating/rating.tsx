import { useLocation } from 'react-router-dom';
import { Block } from '../../const/common';
import { BlockName } from '../../types/common';
import { AppRoute } from '../../const/infrastructure';
import { Offer } from '../../types/offer';

type RatingProps = { block?: BlockName } & Pick<Offer, 'rating'>;

function Rating({
  block = Block.PLACE_CARD,
  rating,
}: RatingProps): JSX.Element {
  const { pathname } = useLocation();

  const isOfferPage = new RegExp(`^${AppRoute.Offer}/[^/]+$`).test(pathname);

  const width = `${(rating / 5) * 100}%`;
  return (
    <div className={`${block}__rating rating`}>
      <div className={`${block}__stars rating__stars`}>
        <span style={{ width }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {isOfferPage && (
        <span className={`${block}__rating-value rating__value`}>4.8</span>
      )}
    </div>
  );
}

export default Rating;
