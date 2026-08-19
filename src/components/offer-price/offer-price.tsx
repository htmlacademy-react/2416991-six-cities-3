import { Offer } from '../../types/offer';

type OfferPriceProps = Pick<Offer, 'price'>;

const OfferPrice = ({ price }: OfferPriceProps): JSX.Element => (
  <div className="offer__price">
    <b className="offer__price-value">&euro;{price}</b>
    <span className="offer__price-text">&nbsp;night</span>
  </div>
);

export default OfferPrice;
