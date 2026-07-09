import { CityName } from '../../types/common';

type CityLinkProps = {
  city: CityName;
};

function CityLink({ city }: CityLinkProps): JSX.Element {
  return (
    <div className="locations__item">
      <a className="locations__item-link" href="#">
        <span>{city}</span>
      </a>
    </div>
  );
}

export default CityLink;
