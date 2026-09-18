import React from 'react';
import PropTypes from 'prop-types';

function LoadingIndicator({ message = 'Loading...', isFullscreen = false }) {
  if (isFullscreen) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true" />
        <p className="loading-text">{message}</p>
      </div>
    );
  }

  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <span className="loading-text">{message}</span>
    </div>
  );
}

LoadingIndicator.propTypes = {
  message: PropTypes.string,
  isFullscreen: PropTypes.bool,
};

export default LoadingIndicator;
