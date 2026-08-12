import { Offer } from '../../types/offer';
import { capitalize } from '../../utils/common';

type OfferFeaturesProps = Pick<
  Offer,
  'type' | 'bedroomsQuantity' | 'maxAdults'
>;

const OfferFeatures = ({
  type,
  bedroomsQuantity,
  maxAdults,
}: OfferFeaturesProps): JSX.Element => (
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

export default OfferFeatures;
