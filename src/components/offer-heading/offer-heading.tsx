import { Block } from '../../const/common';
import Bookmark from '../bookmark/bookmark';
import Mark from '../mark/mark';

type OfferHeadingProps = {
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
}

function OfferHeading({ title, isFavorite, isPremium }: OfferHeadingProps): JSX.Element {
  return (
    <>
      {isPremium && <Mark blockClassName={Block.OFFER} />}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>
        <Bookmark block={Block.OFFER} isSmall={false} isActive={isFavorite} />
      </div>
    </>
  );
}

export default OfferHeading;
