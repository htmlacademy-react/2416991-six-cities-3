import { SPIN_ANIMATION_STYLE } from './const';
import { containerStyles, spinnerStyles } from './style';

const Spinner = (): JSX.Element => (
  <div
    style={containerStyles}
    role="status"
    aria-label="Loading..."
    data-testid="spinner-container"
  >
    <div style={spinnerStyles} />
    <style>{SPIN_ANIMATION_STYLE}</style>
  </div>
);

export default Spinner;
