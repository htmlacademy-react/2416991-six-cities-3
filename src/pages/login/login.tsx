import { Helmet } from 'react-helmet-async';
import CityLink from '../../components/city-link/city-link';
import LoginForm from '../../components/login-form/login-form';

import { getRandomCity } from './utils';

const Login = (): JSX.Element => {
  const randomCity = getRandomCity();

  return (
    <div className="page__login-container container">
      <Helmet>
        <title>6 Cities | Login</title>
      </Helmet>
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <LoginForm />
      </section>
      <section className="locations locations--login locations--current">
        <CityLink city={randomCity} />
      </section>
    </div>
  );
};

export default Login;
