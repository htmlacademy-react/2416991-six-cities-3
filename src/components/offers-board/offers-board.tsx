import { City } from '../../types/common';
import { OfferPreview } from '../../types/offer';
import CardList from '../card-list/card-list';
import SortSelector from '../sort-selector/sort-selector';

type OffersBoardProps = {
  offers: OfferPreview[];
  currentCity: City;
  setActiveOfferId: (id: string | null) => void;
};

function OffersBoard({
  offers,
  currentCity,
  setActiveOfferId,
}: OffersBoardProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers.length} place{offers.length > 1 ? 's' : ''} to stay in{' '}
        {currentCity.name}
      </b>
      <SortSelector />
      <CardList offers={offers} setActiveCardId={setActiveOfferId} />
    </section>
  );
}

export default OffersBoard;
