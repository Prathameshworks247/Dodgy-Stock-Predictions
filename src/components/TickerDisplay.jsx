import React from 'react';

function TickerDisplay({ tickers }) {
  return (
    
    <div className="ticker-choice-display">
      <p>The Selcted tickers will appear here</p>
      {tickers.map((ticker, index) => (
        <span key={index} className="ticker">
          {ticker}
        </span>
      ))}
    </div>
  );
}

export default TickerDisplay;
