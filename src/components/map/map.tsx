import { useEffect, useRef } from 'react';
import { City, OfferPreview } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { currentCustomIcon, defaultCustomIcon } from './const';
import { BlockName } from '../../types/common';
import { Block } from '../../const/common';

type MapProps = {
  city: City;
  offers: OfferPreview[];
  selectedOfferId: OfferPreview['id'] | null;
  block?: BlockName;
};

function Map({ city, offers, selectedOfferId, block = Block.CITIES }: MapProps): JSX.Element {
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

export default Map;

