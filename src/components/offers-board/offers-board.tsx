import { useAppSelector } from '../../hooks';
import CardList from '../card-list/card-list';
import SortSelector from '../sort-selector/sort-selector';


function OffersBoard(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.processedOffers);
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers.length} place{offers.length > 1 ? 's' : ''} to stay in{' '}
        {currentCity.name}
      </b>
      <SortSelector />
      <CardList offers={offers} />
    </section>
  );
}

export default OffersBoard;
