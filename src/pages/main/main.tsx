import CitiesPanel from '../../components/cities-panel/cities-panel';
import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import SortSelector from '../../components/sort-selector/sort-selector';
import UserPanel from '../../components/user-panel/user-panel';
import { SortType } from '../../const';
import { City } from '../../types/common';

type MainProps = {
  numberOfOffers: number;
  activeCity: City;
  currentSortType: typeof SortType[keyof typeof SortType];
};

function Main({ numberOfOffers, activeCity, currentSortType }: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header>
        <UserPanel />
      </Header>

      <main className="page__main page__main--index">
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
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
