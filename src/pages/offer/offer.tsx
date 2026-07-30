import { useParams } from 'react-router-dom';
import NearOffers from '../../components/near-offers/near-offers';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferGoods from '../../components/offer-goods/offer-goods';
import OfferHeading from '../../components/offer-heading/offer-heading';
import OfferHost from '../../components/offer-host/offer-host';
import OfferPrice from '../../components/offer-price/offer-price';
import Rating from '../../components/rating/rating';
import { Block } from '../../const/common';
import { type Offer } from '../../types/offer';
import Map from '../../components/map/map';
import { ScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchNearOffersAction,
  fetchOfferAction,
} from '../../store/api-actions';
import { useEffect } from 'react';
import Spinner from '../../components/spinner/spinner';
import OfferReviews from '../../components/offer-reviews/offer-reviews';
import { Helmet } from 'react-helmet-async';
import {
  setActiveOfferId,
  setNearOffers,
  setOffer,
  setReviews,
} from '../../store/action';

function Offer(): JSX.Element | null {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const offer = useAppSelector((state) => state.offer);
  const isNearOffersLoading = useAppSelector(
    (state) => state.isNearOffersLoading,
  );
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const cuttedNearOffers = [...nearOffers].slice(0, 3);

  useEffect(() => {
    dispatch(setActiveOfferId(offer?.id || null));
  }, [dispatch, offer]);

  useEffect(
    () => () => {
      dispatch(setOffer(null));
      dispatch(setNearOffers([]));
      dispatch(setReviews([]));
      dispatch(setActiveOfferId(null));
    },
    [dispatch],
  );

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferAction(params.id));
      dispatch(fetchNearOffersAction(params.id));
    }
  }, [params.id, dispatch]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>6 Cities | {offer.title}</title>
      </Helmet>
      <ScrollToTop />
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
              bedroomsQuantity={offer.bedroomsQuantity}
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

            <OfferReviews id={offer.id} />
          </div>
        </div>
        {isNearOffersLoading && <Spinner />}
        {!isNearOffersLoading && (
          <Map
            city={offer.city}
            offers={[...cuttedNearOffers, offer]}
            block={Block.OFFER}
          />
        )}
      </section>
      {!isNearOffersLoading && (
        <div className="container">
          <NearOffers offers={cuttedNearOffers} />
        </div>
      )}
    </>
  );
}

export default Offer;
