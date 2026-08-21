import styles from './spinner.module.css';

const Spinner = (): JSX.Element => (
  <div
    className={styles.container}
    role="status"
    aria-label="Loading..."
    data-testid="spinner-container"
  >
    <div className={styles.spinner} data-testid="spinner-icon" />
  </div>
);

export default Spinner;
