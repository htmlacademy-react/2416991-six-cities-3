import CitiesPanel from '../../components/cities-panel/cities-panel';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import SortSelector from '../../components/sort-selector/sort-selector';
import { SortType } from '../../const/common';
import { CityName } from '../../types/common';
import { OfferPreview } from '../../types/offer';

type MainProps = {
  numberOfOffers: number;
  activeCity: CityName;
  currentSortType: typeof SortType[keyof typeof SortType];
  offers: OfferPreview[];
};

function Main({ numberOfOffers, activeCity, currentSortType }: MainProps): JSX.Element {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesPanel activeCity={activeCity} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{numberOfOffers} places to stay in Amsterdam</b>
            <SortSelector currentSortType={currentSortType} />
            <div className="cities__places-list places__list tabs__content">
              <OfferCard />
              <OfferCard />
              <OfferCard />
              <OfferCard />
              <OfferCard />
            </div>
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
