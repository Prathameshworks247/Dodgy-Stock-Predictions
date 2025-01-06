import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import TickerInputForm from './components/TickerInputForm';
import TickerDisplay from './components/TickerDisplay';
import LoadingPanel from './components/LoadingPanel';
import ReportPanel from './components/ReportPanel';
import { dates } from './utils/dates';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState('');

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function generateStockAnalysis(stockData) {
    try {
      // Format the data into a more readable structure for Gemini
      const formattedData = stockData.map(stock => {
        const results = stock.data.results || [];
        const startPrice = results[0]?.c || 'N/A';
        const endPrice = results[results.length - 1]?.c || 'N/A';
        const totalVolume = results.reduce((sum, day) => sum + (day.v || 0), 0);
        const percentageChange = results.length > 1 && startPrice !== 'N/A'
          ? (((endPrice - startPrice) / startPrice) * 100).toFixed(2) + '%'
          : 'N/A';
  
        return {
          ticker: stock.ticker,
          startPrice,
          endPrice,
          totalVolume,
          percentageChange,
        };
      });
  
      const prompt = `As a stock market analyst, please provide a brief analysis of the following stocks:
      ${JSON.stringify(formattedData, null, 2)}
      
      Please include:
      1. Overall market trend for each stock
      2. make it like a guru making prediction
      3. jokingly recommend whether to invest of not
      4. make it at max 80 lines`;
  
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      console.error('Error generating analysis:', error);
      throw new Error('Failed to generate stock analysis');
    }
  }

  const addTicker = (ticker) => {
    if (!ticker || tickers.includes(ticker.toUpperCase())) 
      return;
    setTickers(prev => [...prev, ticker.toUpperCase()]);
  };
  const deleteTicker = (ticker) => {
    if (!ticker) return;
    setTickers(prev => prev.filter(tick => tick !== ticker.toUpperCase())); 
  };

  const generateReport = async () => {
    const apiKey = import.meta.env.VITE_APP_POLYGON_API_KEY;
    
    if (!apiKey) {
      console.error('API Key is missing!');
      setError('API Key is not defined.');
      return;
    }
  
    if (tickers.length === 0) return;
  
    setLoading(true);
    setError(null);
  
    try {
      // Fetch stock data
      const stockData = await Promise.all(
        tickers.map(async (ticker) => {
          const url = new URL(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}`);
          url.searchParams.append('apiKey', apiKey);
          const response = await axios.get(url.toString());
          return { ticker, data: response.data };
        })
      );

      // Generate analysis using Gemini
      const analysis = await generateStockAnalysis(stockData);
      setReport(analysis);
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to fetch stock data. Please try again later.'
      );
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <TickerInputForm addTicker={addTicker} tickers={tickers} />
      <TickerDisplay tickers={tickers} deleteTicker={deleteTicker} />
      
      <div className="button-group mt-3">
        <button
          className="generate-report-btn"
          onClick={generateReport}
          disabled={loading || tickers.length === 0}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {loading && <LoadingPanel message=<p className='text-white'>Processing...</p> />}
      
      {!loading && !error && report && (
        <ReportPanel report={report} />
      )}
      <h2 className='text-white'>ACCURATE 20% OF THE TIMES!!☺️</h2>
    </div>
  );
}

export default App;