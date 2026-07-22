import { SortType } from '../../types/common';

type SortOptionProps = {
  title: SortType;
  isActive: boolean;
  onItemClick: (sortType: SortType) => void;
};

function SortItem({ title, isActive, onItemClick }: SortOptionProps): JSX.Element {
  return (
    <li
      className={`places__option ${isActive ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={() => onItemClick(title)}
    >
      {title}
    </li>
  );
}

export default SortItem;
