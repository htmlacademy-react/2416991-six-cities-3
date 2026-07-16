import { Block } from '../../const/common';
import { BlockName } from '../../types/common';
import { Size } from './const';

type BookmarkProps = {
  isActive: boolean;
  block?: BlockName;
  isSmall?: boolean;
};

function Bookmark({
  isActive,
  block = Block.PLACE_CARD,
  isSmall = true,
}: BookmarkProps): JSX.Element {
  const size = isSmall ? Size.SMALL : Size.BIG;

  return (
    <button
      className={`${block}__bookmark-button ${isActive ? `${block}__bookmark-button--active` : ''} button`}
      type="button"
    >
      <svg
        className={`${block}__bookmark-icon`}
        width={size.width}
        height={size.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
