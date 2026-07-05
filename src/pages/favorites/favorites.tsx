import FavoritesItem from '../../components/favorites-item/favorites-item';
import { Cities } from '../../const/business';
import { OfferPreview } from '../../types/offer';

type FavoritesProps = {
  favoriteOffers: OfferPreview[];
}

function Favorites({ favoriteOffers }: FavoritesProps): JSX.Element {
  const groupedOffers = [...Cities].map((city) => ({
    city,
    offers: favoriteOffers.filter((offer) => offer.city.name === city),
  }));

  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {groupedOffers.map(({ city, offers }) => (
            <FavoritesItem key={city} city={city} offers={offers} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Favorites;
