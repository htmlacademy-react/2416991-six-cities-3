import { useParams } from 'react-router-dom';
import NearOffers from '../../components/near-offers/near-offers';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferGoods from '../../components/offer-goods/offer-goods';
import OfferHeading from '../../components/offer-heading/offer-heading';
import OfferHost from '../../components/offer-host/offer-host';
import OfferPrice from '../../components/offer-price/offer-price';
import OfferReviews from '../../components/offer-reviews/offer-reviews';
import Rating from '../../components/rating/rating';
import { Block } from '../../const/common';
import { getOfferById } from '../../mocks/mock';
import { type Offer } from '../../types/offer';
import { previewOffers } from '../../mocks/offers';
import { Helmet } from 'react-helmet-async';

function Offer(): JSX.Element {
  const nearOffers = previewOffers.slice(0, 3);
  const { id } = useParams<{ id: string }>() as { id: string }; //! mock
  const offer = getOfferById(id) as Offer;
  return (
    <>
      <Helmet>
        <title>6 Cities | {offer.title}</title>
      </Helmet>
      <section className="offer">
        <OfferGallery images={offer.images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <OfferHeading
              title={offer.title}
              isFavorite={offer.isFavorite}
              isPremium={offer.isPremium}
            />

            <Rating block={Block.OFFER} rating={offer.rating} />

            <OfferFeatures
              type={offer.type}
              bedroomsQuantity={offer.bedrooms}
              maxAdults={offer.maxAdults}
            />

            <OfferPrice price={offer.price} />

            <OfferGoods goods={offer.goods} />

            <OfferHost
              name={offer.host.name}
              avatarUrl={offer.host.avatarUrl}
              isPro={offer.host.isPro}
              description={offer.description}
            />

            <OfferReviews id={id} />
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <NearOffers offers={nearOffers} />
      </div>
    </>
  );
}

export default Offer;
