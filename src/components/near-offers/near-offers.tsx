import { Block } from '../../const/common';
import OfferCard from '../offer-card/offer-card';

function NearOffers(): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OfferCard block={Block.NEAR_PLACES} />
        <OfferCard block={Block.NEAR_PLACES} />
        <OfferCard block={Block.NEAR_PLACES} />
      </div>
    </section>
  );
}

export default NearOffers;
