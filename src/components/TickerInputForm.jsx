import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TickerInputForm({ addTicker, tickers }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 2) {
      addTicker(input.toUpperCase());
      setInput('');
      setError('');
    } else {
      setError('Ticker must be at least 3 characters long (e.g., TSLA).');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <label htmlFor="ticker-input">
        <h3>Add up to 3 stock tickers to get a super accurate stock predictions report👇</h3>
      </label>
      <div className="border border-black">
        <input
        className='form-control'
          type="text"
          id="ticker-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="MSFT"
          disabled={tickers.length >= 3}
        />
        <button type="submit" disabled={tickers.length >= 3} className='btn btn-danger'>
          <img src="/images/add.svg" alt="add" className='btn '/>
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

