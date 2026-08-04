import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { useEffect, useMemo } from 'react';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  fetchReviews,
} from '../store/api-actions';
import {
  setActiveOfferId,
  setNearOffers,
  setOffer,
  setReviews,
} from '../store/action';
import { MAX_NEAR_OFFERS_COUNT } from '../const/business';

function useOfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const offer = useAppSelector((state) => state.offer);
  const isNearOffersLoading = useAppSelector(
    (state) => state.isNearOffersLoading,
  );
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearOffersAction(id));
      dispatch(fetchReviews(id));
      dispatch(setActiveOfferId(id));
    }
  }, [id, dispatch]);

  useEffect(
    () => () => {
      dispatch(setOffer(null));
      dispatch(setNearOffers([]));
      dispatch(setReviews([]));
      dispatch(setActiveOfferId(null));
    },
    [dispatch],
  );

  const cuttedNearOffers = useMemo(
    () => nearOffers.slice(0, MAX_NEAR_OFFERS_COUNT),
    [nearOffers],
  );

  const mapOffers = useMemo(
    () => (offer ? [...cuttedNearOffers, offer] : cuttedNearOffers),
    [cuttedNearOffers, offer],
  );

  return {
    offer,
    reviews,
    cuttedNearOffers,
    mapOffers,
    isOfferLoading,
    isNearOffersLoading,
  };
}

export default useOfferPage;
