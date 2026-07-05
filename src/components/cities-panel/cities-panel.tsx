import { Cities } from '../../const/business';
import { CityName } from '../../types/common';
import CityTab from '../city-tab/city-tab';

type CitiesPanelProps = {
  activeCity: CityName;
};

function CitiesPanel({ activeCity }: CitiesPanelProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Cities.map((city) => (
            <CityTab key={city} city={city} isActive={city === activeCity} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesPanel;
