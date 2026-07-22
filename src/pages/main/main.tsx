import { useEffect, useState } from 'react';
import CitiesPanel from '../../components/cities-panel/cities-panel';
import Map from '../../components/map/map';
import { OfferPreview } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadOffers, setCurrentCity } from '../../store/action';
import { City } from '../../types/common';
import { previewOffers } from '../../mocks/offers';
import OffersBoard from '../../components/offers-board/offers-board';
import NoPlaces from '../../components/no-places/no-places';

function Main(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.processedOffers);
  const isEmpty = offers.length < 1;
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
        <div
          className={`cities__places-container ${isEmpty ? 'cities__places-container--empty' : ''} container`}
        >
          {isEmpty && <NoPlaces />}
          {!isEmpty && (
            <OffersBoard
              offers={offers}
              currentCity={currentCity}
              setActiveOfferId={setActiveOfferId}
            />
          )}
          <div className="cities__right-section">
            {!isEmpty && (
              <Map
                city={currentCity}
                offers={offers}
                selectedOfferId={activeOfferId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
