import { Block } from '../../const/common';
import { CityName } from '../../types/common';
import { OfferPreview } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type FavoritesItemProps = {
  city: CityName;
  offers: OfferPreview[];
}

function FavoritesItem({ city, offers }: FavoritesItemProps): JSX.Element | null {
  if ((offers.length) === 0) {
    return null;
  }
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferCard key={offer.id} block={Block.FAVORITES} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesItem;
