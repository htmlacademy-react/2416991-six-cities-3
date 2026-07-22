import { Helmet } from 'react-helmet-async';
import FavoritesItem from '../../components/favorites-item/favorites-item';
import { Cities } from '../../const/business';
import { OfferPreview } from '../../types/offer';

type FavoritesProps = {
  favoriteOffers: OfferPreview[];
};

function Favorites({ favoriteOffers }: FavoritesProps): JSX.Element {
  const groupedOffers = [...Cities].map((city) => ({
    city,
    offers: favoriteOffers.filter((offer) => offer.city.name === city.name),
  }));

  return (
    <div className="page__favorites-container container">
      <Helmet>
        <title>6 Cities | Favorites</title>
      </Helmet>
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {groupedOffers.map(({ city, offers }) => (
            <FavoritesItem key={city.name} city={city.name} offers={offers} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Favorites;
