import { useLocation } from 'react-router-dom';
import { Block } from '../../const/common';
import { BlockName } from '../../types/common';
import { AppRoute } from '../../const/infrastructure';

type RatingProps = {
  block?: BlockName;
  starCount: 1 | 2 | 3 | 4 | 5;
}

function Rating({ block = Block.PLACE_CARD, starCount }: RatingProps): JSX.Element {
  const { pathname } = useLocation();

  const isOfferPage = new RegExp(`^${AppRoute.Offer}/[^/]+$`).test(pathname);

  const width = `${(starCount / 5) * 100}%`;
  return (
    <div className={`${block}__rating rating`}>
      <div className={`${block}__stars rating__stars`}>
        <span style={{ width }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {isOfferPage && <span className={`${block}__rating-value rating__value`}>4.8</span>}
    </div>
  );
}

export default Rating;
