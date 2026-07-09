import { Block } from '../../const/common';
import { Offer } from '../../types/offer';
import Bookmark from '../bookmark/bookmark';
import Mark from '../mark/mark';

type OfferHeadingProps = Pick<Offer, 'title' | 'isFavorite' | 'isPremium'>;

function OfferHeading({
  title,
  isFavorite,
  isPremium,
}: OfferHeadingProps): JSX.Element {
  return (
    <>
      {isPremium && <Mark blockClassName={Block.OFFER} />}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">{title}</h1>
        <Bookmark block={Block.OFFER} isSmall={false} isActive={isFavorite} />
      </div>
    </>
  );
}

export default OfferHeading;
