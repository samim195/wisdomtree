import React, { useEffect, useState } from "react";
import { fetchHistoricalData } from "../api";

const HistoricalData = ({ ticker }) => {
  const [history, setHistory] = useState([]);

  console.log(ticker)
  useEffect(() => {
    fetchHistoricalData(ticker).then((data) => setHistory(data));
  }, [ticker]);

  return (
    <div>
      <h2>Historical Data for {ticker}</h2>
      <table border="1">
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
            <tr key={row.timestamp}>
              <td>{row.timestamp}</td>
              <td>{row.open}</td>
              <td>{row.high}</td>
              <td>{row.low}</td>
              <td>{row.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalData;
