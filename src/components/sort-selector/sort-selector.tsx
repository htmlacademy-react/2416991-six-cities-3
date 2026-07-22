import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { SortType } from '../../types/common';
import { setSortType } from '../../store/action';
import { SortOption } from '../../const/business';
import SortItem from '../sort-item/sort-item';

function SortSelector(): JSX.Element {
  const currentSortType = useAppSelector((state) => state.sortOption);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  useEffect(() => {
    setIsOptionsOpen(false);
  }, [currentSortType]);

  const dispatch = useAppDispatch();

  const setSortOption = (sortType: SortType) => {
    dispatch(setSortType(sortType));
  };

  const sortTypes = Object.values(SortOption);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOptionsOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {sortTypes.map((sortItem) => (
            <SortItem
              key={sortItem}
              title={sortItem}
              isActive={sortItem === currentSortType}
              onItemClick={setSortOption}
            />
          ))}
        </ul>
      )}
    </form>
  );
}

export default SortSelector;
