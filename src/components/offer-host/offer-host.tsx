import { Offer, User } from '../../types/offer';
import OfferDescription from '../offer-description/offer-description';

type OfferHostProps = User & Pick<Offer, 'description'>;

const OfferHost = ({
  name,
  avatarUrl,
  isPro,
  description,
}: OfferHostProps): JSX.Element => (
  <div className="offer__host">
    <h2 className="offer__host-title">Meet the host</h2>
    <div className="offer__host-user user">
      <div
        className={`offer__avatar-wrapper ${isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
      >
        <img
          className="offer__avatar user__avatar"
          src={avatarUrl}
          width="74"
          height="74"
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{name}</span>
      {isPro && <span className="offer__user-status">Pro</span>}
    </div>
    <OfferDescription description={description} />
  </div>
);

export default OfferHost;
