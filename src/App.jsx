import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import TickerInputForm from './components/TickerInputForm';
import TickerDisplay from './components/TickerDisplay';
import LoadingPanel from './components/LoadingPanel';
import ReportPanel from './components/ReportPanel';
import { dates } from './utils/dates';

function App() {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [report, setReport] = useState('');

  // Add a new ticker to the list
  const addTicker = (ticker) => {
    setTickers((prevTickers) => [...prevTickers, ticker]);
  };

  // Fetch stock data when tickers change
  useEffect(() => {
    if (tickers.length === 0) return;

    const fetchStockData = async () => {
      setLoading(true);
      setApiMessage('');

      try {
        const stockData = await Promise.all(
          tickers.map(async (ticker) => {
            const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.POLYGON_API_KEY}`;
            const response = await axios.get(url);
            return response.data;
          })
        );

        fetchReport(stockData);
      } catch (error) {
        setApiMessage('There was an error fetching stock data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [tickers]);

  // Generate the report based on fetched data
  const fetchReport = (data) => {
    const combinedData = data.map((item) => JSON.stringify(item)).join('\n');
    setReport(`Report generated:\n${combinedData}`);
  };

  return (
    <div className="App">
      <Header />
      <TickerInputForm addTicker={addTicker} tickers={tickers} />
      <TickerDisplay tickers={tickers} />
      <button
        className="generate-report-btn"
        onClick={() => setTickers([...tickers])} // Force re-fetch when clicked
        disabled={tickers.length === 0}
      >
        Generate Report
      </button>
      <p className='fw-bolder fs-3'>Correct 15% of the times! LOL!</p>
      {loading && <LoadingPanel message={apiMessage || 'Querying Stocks API...'} />}
      {!loading && report && <ReportPanel report={report} />}

    </div>
  );
}

export default App;
