import React, { useEffect, useState } from "react";
import { fetchHistoricalData } from "../api";
import "./HistoricalData.css"; // Make sure to import the CSS file

const HistoricalData = ({ ticker }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistoricalData(ticker).then((data) => setHistory(data));
  }, [ticker]);

  return (
    <div className="historical-data-container">
      <h2>Historical Data for {ticker}</h2>
      <table className="historical-data-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id}>
              <td>{new Date(row.timestamp).toLocaleString()}</td>
              <td>{row.open_price}</td>
              <td>{row.high_price}</td>
              <td>{row.low_price}</td>
              <td>{row.close_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalData;
