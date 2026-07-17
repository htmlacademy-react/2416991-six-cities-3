import { OfferPreview } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type CardListProps = {
  offers: OfferPreview[];
  setActiveCardId?: (offerId: OfferPreview['id'] | null) => void;
};

function CardList({ offers, setActiveCardId }: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          setActiveCardId={setActiveCardId}
        />
      ))}
    </div>
  );
}

export default CardList;
