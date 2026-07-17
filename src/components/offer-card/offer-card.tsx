import { Link } from 'react-router-dom';
import { Block } from '../../const/common';
import { AppRoute } from '../../const/infrastructure';
import { BlockName } from '../../types/common';
import { OfferPreview } from '../../types/offer';
import Bookmark from '../bookmark/bookmark';
import Mark from '../mark/mark';
import Rating from '../rating/rating';
import { capitalize } from '../../utils/common';
import { ImageSize } from './const';

type OfferCardProps = {
  block?: BlockName;
  offer: OfferPreview;
  setActiveCardId?: (offerId: string | null) => void;
};

function OfferCard({
  block = Block.CITIES,
  offer,
  setActiveCardId,
}: OfferCardProps): JSX.Element {
  const imageSize =
    block === Block.FAVORITES ? ImageSize.SMALL : ImageSize.REGULAR;

  const mouseEnterHandler = () => {
    if (setActiveCardId) {
      setActiveCardId(offer.id);
    }
  };

  const mouseLeaveHandler = () => {
    if (setActiveCardId) {
      setActiveCardId(null);
    }
  };

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {offer.isPremium && <Mark />}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${block}__info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>{' '}
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark isActive={offer.isFavorite} />
        </div>
        <Rating rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
