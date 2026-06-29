import { SortType } from '../../const';
import SortOption from '../sort-option/sort-option';

type SortSelectorProps = {
  currentSortType: typeof SortType[keyof typeof SortType];
}

function SortSelector({ currentSortType }: SortSelectorProps): JSX.Element {
  const sortTypes = Object.values(SortType);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortTypes.map((sortItem) => (
          <SortOption key={sortItem} title={sortItem} isActive={sortItem === currentSortType} />
        ))}
      </ul>
    </form>
  );
}

export default SortSelector;
