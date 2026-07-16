import { CSSProperties } from 'react';
import { SPIN_ANIMATION_NAME } from './const';

export const containerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
};

export const spinnerStyles: CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  animation: `${SPIN_ANIMATION_NAME} 1s linear infinite`,
};
