export const SPIN_ANIMATION_NAME = 'spin';

export const SPIN_ANIMATION_STYLE = `
  @keyframes ${SPIN_ANIMATION_NAME} {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
