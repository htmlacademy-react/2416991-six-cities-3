import { CSSProperties } from 'react';

const containerStyles: CSSProperties = {
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

const spinnerStyles: CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

function Spinner(): JSX.Element {
  return (
    <div style={containerStyles}>
      <div style={spinnerStyles} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Spinner;
