import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCurrentCity } from '../../store/slices/app/app.slice';
import { City } from '../../types/common';
import { AppRoute } from '../../const/infrastructure';
import { MouseEvent } from 'react';

type CityLinkProps = {
  city: City;
};

const CityLink = ({ city }: CityLinkProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCityClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentCity(city));
    navigate(AppRoute.Root);
  };

  return (
    <div className="locations__item">
      <a className="locations__item-link" href="#" onClick={handleCityClick}>
        <span>{city.name}</span>
      </a>
    </div>
  );
};

export default CityLink;
