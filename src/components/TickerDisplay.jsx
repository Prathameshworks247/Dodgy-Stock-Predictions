import React from 'react';

function TickerDisplay({ tickers,deleteTicker }) {
  return (
    <div className="ticker-choice-display">
      <p className='text-white'>The Selcted tickers will appear here</p>
      <div className='ticker-box'>
      {tickers.map((ticker, index) => (
        <div className='text-container shadow text-white'><span key={index} className='ticker'>
          {ticker}
        </span>
        <button className="close-btn large" onClick={() => deleteTicker(ticker)}>×</button></div>
      ))}
      </div>
    </div>
  );
}

export default TickerDisplay;
