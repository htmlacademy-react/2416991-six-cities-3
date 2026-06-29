import OfferCard from '../offer-card/offer-card';

function NearOffers(): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </div>
    </section>
  );
}

export default NearOffers;
