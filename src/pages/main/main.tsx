import { useEffect, useState } from 'react';
import CardList from '../../components/card-list/card-list';
import CitiesPanel from '../../components/cities-panel/cities-panel';
import Map from '../../components/map/map';
import SortSelector from '../../components/sort-selector/sort-selector';
import { SortType } from '../../const/common';
import { OfferPreview } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadOffers, setCurrentCity } from '../../store/action';
import { City } from '../../types/common';
import { previewOffers } from '../../mocks/offers';

type MainProps = {
  currentSortType: (typeof SortType)[keyof typeof SortType];
};

function Main({ currentSortType }: MainProps): JSX.Element {

  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offersByCity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers(previewOffers));
  }, [dispatch]);

  const changeActiveCity = (city: City) => {
    dispatch(setCurrentCity(city));
  };

  const [activeOfferId, setActiveOfferId] = useState<OfferPreview['id'] | null>(
    null,
  );

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesPanel
        activeCity={currentCity.name}
        onCityClick={changeActiveCity}
      />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offers.length} places to stay in {currentCity.name}
            </b>
            <SortSelector currentSortType={currentSortType} />
            <CardList offers={offers} setActiveCardId={setActiveOfferId} />
          </section>
          <div className="cities__right-section">
            <Map
              city={currentCity}
              offers={offers}
              selectedOfferId={activeOfferId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
