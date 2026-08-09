import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import './error-banner.css';

const ErrorBanner = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <section className="error-banner">
      <div className="error-banner__wrapper">
        <p className="error-banner__text">Failed to load offers</p>
        <button
          onClick={() => {
            dispatch(fetchOffersAction());
          }}
          className="error-banner__button button"
          type="button"
        >
          Try again
        </button>
      </div>
    </section>
  );
};

export default ErrorBanner;
