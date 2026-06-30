import { City } from '../../types/common';

type CityTabProps = {
  city: City;
  isActive: boolean;
}

function CityTab({ city, isActive }: CityTabProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default CityTab;
