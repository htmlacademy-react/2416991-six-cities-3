import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { useEffect, useMemo } from 'react';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  fetchReviews,
} from '../store/api-actions';
import { AppRoute } from '../const/infrastructure';
import {
  getIsNearOffersLoading,
  getIsOfferLoading,
  getIsOfferLoadingError,
  getNearOffers,
  getOffer,
} from '../store/slices/offer/offer.selectors';
import { getReviews } from '../store/slices/reviews/reviews.selectors';
import { setActiveOfferId } from '../store/slices/app/app.slice';
import { clearOfferPage } from '../store/slices/offer/offer.slice';

function useOfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const isOfferLoadingError = useAppSelector(getIsOfferLoadingError);

  const offer = useAppSelector(getOffer);
  const isNearOffersLoading = useAppSelector(getIsNearOffersLoading);
  const nearOffers = useAppSelector(getNearOffers);
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearOffersAction(id));
      dispatch(fetchReviews(id));
      dispatch(setActiveOfferId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isOfferLoadingError) {
      navigate(AppRoute.NotFound, { replace: true });
    }
  }, [isOfferLoadingError, navigate]);

  useEffect(
    () => () => {
      dispatch(clearOfferPage());
    },
    [dispatch],
  );

  const mapOffers = useMemo(
    () => (offer ? [...nearOffers, offer] : nearOffers),
    [nearOffers, offer],
  );

  return {
    offer,
    reviews,
    nearOffers,
    mapOffers,
    isOfferLoading,
    isNearOffersLoading,
  };
}

export default useOfferPage;
