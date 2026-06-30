import { SortType } from '../../const';

type SortOptionProps = {
  title: typeof SortType[keyof typeof SortType];
  isActive: boolean;
}

function SortOption({ title, isActive }: SortOptionProps): JSX.Element {
  return (
    <li className={`places__option ${isActive ? 'places__option--active' : ''}`} tabIndex={0}>{title}</li>
  );
}

export default SortOption;
