import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';
import { memo } from 'react';

const Footer = memo(
  (): JSX.Element => (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Root}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  ),
);

Footer.displayName = 'Footer';

export default Footer;
