import { useEffect, useState, RefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/common';
import { DEFAULT_CITY } from '../const/business';

const useMap = (
  mapRef: RefObject<HTMLElement | null>,
  city: City,
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: DEFAULT_CITY.location.latitude,
          lng: DEFAULT_CITY.location.longitude,
        },
        zoom: DEFAULT_CITY.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
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
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom,
        {
          animate: false,
        },
      );
    }
  }, [map, city]);

  return map;
};

export default useMap;
