import CitiesPanel from '../../components/cities-panel/cities-panel';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentCity } from '../../store/action';
import { City } from '../../types/common';
import OffersBoard from '../../components/offers-board/offers-board';
import NoPlaces from '../../components/no-places/no-places';
import { useCallback } from 'react';

function Main(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.processedOffers);
  const isEmpty = offers.length === 0;
  const dispatch = useAppDispatch();

  const changeActiveCity = useCallback((city: City) => {
    dispatch(setCurrentCity(city));
  }, [dispatch]);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesPanel
        activeCity={currentCity.name}
        onCityClick={changeActiveCity}
      />
      <div className="cities">
        <div
          className={`cities__places-container ${isEmpty ? 'cities__places-container--empty' : ''} container`}
        >
          {isEmpty && <NoPlaces />}
          {!isEmpty && (
            <OffersBoard />
          )}
          <div className="cities__right-section">
            {!isEmpty && <Map city={currentCity} offers={offers} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
