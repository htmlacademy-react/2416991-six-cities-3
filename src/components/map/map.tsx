import { memo, useEffect, useRef } from 'react';
import { Offer, OfferPreview } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { currentCustomIcon, defaultCustomIcon } from './const';
import { BlockName, City } from '../../types/common';
import { Block } from '../../const/common';
import { useAppSelector } from '../../hooks';
import { getActiveOffId } from '../../store/slices/app/app.selectors';

type MapProps = {
  city: City;
  offers: (OfferPreview | Offer)[];
  block?: BlockName;
};

function Map({ city, offers, block = Block.CITIES }: MapProps): JSX.Element {
  const selectedOfferId = useAppSelector(getActiveOffId);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker
          .setIcon(
            selectedOfferId !== null && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId]);
  return <section className={`${block}__map map`} ref={mapRef}></section>;
}

const MemoizedMap = memo(
  Map,
  (prevProps: MapProps, nextProps: MapProps): boolean => {
    if (
      prevProps.block !== nextProps.block ||
      prevProps.city.name !== nextProps.city.name
    ) {
      return false;
    }

    if (prevProps.offers.length !== nextProps.offers.length) {
      return false;
    }

    const prevIds = prevProps.offers
      .map((offer) => offer.id)
      .sort()
      .join(',');
    const nextIds = nextProps.offers
      .map((offer) => offer.id)
      .sort()
      .join(',');

    return prevIds === nextIds;
  },
);

export default MemoizedMap;
