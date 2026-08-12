import { useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/slices/app/app.selectors';
import { getOffers } from '../../store/slices/offers/offers.selectors';
import CardList from '../card-list/card-list';
import SortSelector from '../sort-selector/sort-selector';

const OffersBoard = (): JSX.Element => {
  const currentCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getOffers);
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
};

export default OffersBoard;
