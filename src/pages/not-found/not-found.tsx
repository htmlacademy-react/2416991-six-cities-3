import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Illustration404 from './404.svg';
import styles from './not-found.module.css';

const DEFAULT_LINK_STYLE = {
  backgroundColor: 'transparent',
  color: 'rgb(51, 51, 51)',
};

const HOVER_LINK_STYLE = {
  backgroundColor: 'rgb(68, 129, 195)',
  color: 'rgb(255, 255, 255)',
};

const NotFound = (): JSX.Element => {
  const [linkStyle, setLinkStyle] = useState(DEFAULT_LINK_STYLE);

  return (
    <section className={styles.container}>
      <Helmet>
        <title>6 Cities | 404 Not Found</title>
      </Helmet>

      <img
        src={Illustration404}
        alt="404 Illustration"
        className={styles.illustration}
      />

      <h1 className={styles.heading}>404</h1>
      <p className={styles.description}>Oops! That page does not exist</p>

      <Link
        to="/"
        className={styles.link}
        style={linkStyle}
        onMouseEnter={() => setLinkStyle(HOVER_LINK_STYLE)}
        onMouseLeave={() => setLinkStyle(DEFAULT_LINK_STYLE)}
      >
        Return to the home page
      </Link>
    </section>
  );
};

export default NotFound;
