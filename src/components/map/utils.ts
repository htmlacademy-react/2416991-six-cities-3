import { MapProps } from './map';

export const areMapPropsEqual = (
  prevProps: MapProps,
  nextProps: MapProps,
): boolean => {
  if (
    prevProps.block !== nextProps.block ||
    prevProps.city.name !== nextProps.city.name
  ) {
    return false;
  }

  if (prevProps.offers.length !== nextProps.offers.length) {
    return false;
  }

  return prevProps.offers.every(
    (offer, index) => offer.id === nextProps.offers[index]?.id,
  );
};
