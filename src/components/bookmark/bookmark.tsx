import { Block } from '../../const';
import { BlockName } from '../../types/common';

type BookmarkProps = {
  block?: BlockName;
  isSmall?: boolean;
};

const Size = {
  SMALL: {
    width: '18',
    height: '19',
  },
  BIG: {
    width: '31',
    height: '33',
  },
};

function Bookmark({ block = Block.PLACE_CARD, isSmall = true }: BookmarkProps): JSX.Element {
  const size = isSmall ? Size.SMALL : Size.BIG;
  return (
    <button className={`${block}__bookmark-button button`} type="button">
      <svg className={`${block}__bookmark-icon`} width={size.width} height={size.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
