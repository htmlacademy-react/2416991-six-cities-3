import { Block } from '../../const/common';
import { BlockName } from '../../types/common';
import { OfferPreview } from '../../types/offer';
import Bookmark from '../bookmark/bookmark';
import Mark from '../mark/mark';
import Rating from '../rating/rating';

type OfferCardProps = {
  block?: BlockName;
  offer: OfferPreview;
  setActiveCardId: (offerId: string | null) => void;
}

const ImageSize = {
  REGULAR: {
    width: 260,
    height: 200,
  },
  SMALL: {
    width: 150,
    height: 110,
  },
} as const;

function OfferCard({ block = Block.CITIES, offer, setActiveCardId }: OfferCardProps): JSX.Element {
  const imageSize = block === Block.FAVORITES ? ImageSize.SMALL : ImageSize.REGULAR;

  return (
    <article className={`${block}__card place-card`} onMouseEnter={() => setActiveCardId(offer.id)} onMouseLeave={() => setActiveCardId(null)}>
      {offer.isPremium && <Mark />}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={imageSize.width} height={imageSize.height} alt="Place image" />
        </a>
      </div>
      <div className={`${block}__info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            {' '}
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark isActive={offer.isFavorite} />
        </div>
        <Rating rating={offer.rating} />
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
