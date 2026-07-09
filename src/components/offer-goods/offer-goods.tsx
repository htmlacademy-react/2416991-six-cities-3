import { Offer } from '../../types/offer';

type OfferGoodsProps = Pick<Offer, 'goods'>;

function OfferGoods({ goods }: OfferGoodsProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((good) => (
          <li className="offer__inside-item" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferGoods;
