import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherBox from "./components/WeatherBox/WeatherBox";
import Header from "./components/Header/Header";
import LocationDialog from "./components/LocationDialog/LocationDialog";
import LocationDropdown from "./components/LocationDropdown/LocationDropdown";
import React, { useState } from "react";

export const LongContext = React.createContext();

function App() {
  
  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);

  return (
    <div className="bg-sky-200 pb-16">
      <LongContext.Provider value={ {longi, setLongi, lati, setLati} }>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LocationDialog />} />
          <Route path="/1" element={<LocationDropdown />} />
          <Route path="/location" element={<WeatherBox />} />
        </Routes>
      </BrowserRouter>
    </LongContext.Provider>
    </div>
  );
}

export default App;
