import { useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/slices/app/app.selectors';
// ! наверное стоит сделать кнопку новой загрузки предложений

function NoPlaces(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any offers available at the moment in{' '}
          {currentCity.name}
        </p>
      </div>
    </section>
  );
}

export default NoPlaces;
