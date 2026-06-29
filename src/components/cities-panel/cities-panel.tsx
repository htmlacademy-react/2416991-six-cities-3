import { City } from '../../types/common';
import CityTab from '../city-tab/city-tab';

type CitiesPanelProps = {
  activeCity: City;
};

function CitiesPanel({ activeCity }: CitiesPanelProps): JSX.Element {
  const cities: City[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <CityTab key={city} city={city} isActive={city === activeCity} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesPanel;
