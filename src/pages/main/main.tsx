import CardList from '../../components/card-list/card-list';
import CitiesPanel from '../../components/cities-panel/cities-panel';
import Map from '../../components/map/map';
import SortSelector from '../../components/sort-selector/sort-selector';
import { SortType } from '../../const/common';
import { CityName } from '../../types/common';
import { OfferPreview } from '../../types/offer';

type MainProps = {
  activeCity: CityName;
  currentSortType: typeof SortType[keyof typeof SortType];
  offers: OfferPreview[];
};

function Main({ activeCity, currentSortType, offers }: MainProps): JSX.Element {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesPanel activeCity={activeCity} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in Amsterdam</b>
            <SortSelector currentSortType={currentSortType} />
            <CardList offers={offers} />
          </section>
          <div className="cities__right-section">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
