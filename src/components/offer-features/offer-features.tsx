import { capitalize } from '../../utils/common';

type OfferFeaturesProps = {
  type: string;
  bedroomsQuantity: number;
  maxAdults: number;
};

function OfferFeatures({ type, bedroomsQuantity, maxAdults }: OfferFeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {capitalize(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedroomsQuantity} Bedrooms
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

export default OfferFeatures;
