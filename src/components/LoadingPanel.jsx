import React from 'react';

function LoadingPanel({ message }) {
  return (
    <section className="loading-panel">
      <img src="/images/loader.svg" alt="Loading..." />
      <div id="api-message">{message}</div>
    </section>
  );
}

export default LoadingPanel;
