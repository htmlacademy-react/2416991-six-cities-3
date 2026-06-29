import Main from '../../pages/main/main';
import { City } from '../../types/common';

type AppProps = {
  numberOfOffers: number;
}

const tempActiveCity: City = 'Dusseldorf';

function App({ numberOfOffers }: AppProps): JSX.Element {
  return (
    <Main numberOfOffers={numberOfOffers} activeCity={tempActiveCity} />
  );
}

export default App;
