import { useState } from 'react';
import CardList from '../../components/card-list/card-list';
import CitiesPanel from '../../components/cities-panel/cities-panel';
import Map from '../../components/map/map';
import SortSelector from '../../components/sort-selector/sort-selector';
import { SortType } from '../../const/common';
import { City, OfferPreview } from '../../types/offer';

type MainProps = {
  activeCity: City;
  currentSortType: typeof SortType[keyof typeof SortType];
  offers: OfferPreview[];
};

function Main({ activeCity, currentSortType, offers }: MainProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<OfferPreview['id'] | null>(null);
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesPanel activeCity={activeCity.name} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in Amsterdam</b>
            <SortSelector currentSortType={currentSortType} />
            <CardList offers={offers} setActiveCardId={setActiveOfferId} />
          </section>
          <div className="cities__right-section">
            <Map city={activeCity} offers={offers} selectedOfferId={activeOfferId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
