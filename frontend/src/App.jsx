import React, { useState } from "react";
import ProductList from "./components/ProductList";
import HistoricalData from "./components/HistoricalData";
import CryptoHeader from "./components/Header";

const App = () => {
  const [selectedTicker, setSelectedTicker] = useState(null);

  return (
    <div>
      <CryptoHeader/>
      <ProductList onSelectTicker={setSelectedTicker} />
      {selectedTicker && <HistoricalData ticker={selectedTicker} />}
    </div>
  );
};

export default App;
