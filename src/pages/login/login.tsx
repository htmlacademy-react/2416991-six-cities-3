import CityLink from '../../components/city-link/city-link';
import LoginForm from '../../components/login-form/login-form';
import { City } from '../../types/common';

function Login(): JSX.Element {
  //! mock
  const mockCurrentCity: City = 'Amsterdam';
  return (

    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <LoginForm />
      </section>
      <section className="locations locations--login locations--current">
        <CityLink city={mockCurrentCity} />
      </section>
    </div>

  );
}

export default Login;
