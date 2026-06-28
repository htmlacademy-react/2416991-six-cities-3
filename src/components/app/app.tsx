import Main from '../../pages/main/main';

type AppProps = {
  numberOfOffers: number;
}

function App({ numberOfOffers }: AppProps): JSX.Element {
  return (
    <Main numberOfOffers={numberOfOffers} />
  );
}

export default App;
