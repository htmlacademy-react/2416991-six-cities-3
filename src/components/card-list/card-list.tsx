import { OfferPreview } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type CardListProps = {
  offers: OfferPreview[];
}

function CardList({ offers }: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default CardList;
