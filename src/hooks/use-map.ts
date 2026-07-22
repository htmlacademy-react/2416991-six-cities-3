import { useEffect, useState, RefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/common';
import { DefaultCity } from '../const/business';

function useMap(
  mapRef: RefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: DefaultCity.location.latitude,
          lng: DefaultCity.location.longitude,
        },
        zoom: DefaultCity.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }

    return () => {
      if (isRenderedRef.current && map) {
        map.remove();
        isRenderedRef.current = false;
      }
    };
  }, [map, mapRef]);

  useEffect(() => {
    if (map) {
      map.flyTo(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom,
        {
          duration: 2,
        }
      );
    }
  }, [map, city]);

  return map;
}

export default useMap;
