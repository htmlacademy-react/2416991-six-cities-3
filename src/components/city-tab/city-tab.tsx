import { City } from '../../types/common';

type CityTabProps = {
  city: City;
  isActive: boolean;
  onTabClick: (city: City) => void;
};

function CityTab({ city, isActive, onTabClick }: CityTabProps): JSX.Element {
  const itemClickHandler = () => {
    if (isActive) {
      return;
    }
    onTabClick(city);
  };
  return (
    <li className="locations__item" onClick={itemClickHandler}>
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        href="#"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CityTab;
