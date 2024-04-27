import React, { useState, useEffect, useContext } from "react";
import { LongContext } from "../../App";

function WeatherBox() {

  const {longi, lati} = useContext(LongContext)

  const [weather, setWeather] = useState();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {

    fetch(`${API_URL}&q=${lati},${longi}&aqi=yes`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => {
        console.log(err.message)
      })
  })

  // console.log(weather)

  return (
    <div className="shadow-lg shadow-slate-800 mt-12 w-[30%] mx-auto flex flex-col items-center bg-white rounded-md">
      <h4 className="text-xl pt-10">{weather?.location.name}</h4>
      <h1 className="text-6xl py-4">{weather?.current.temp_c}&#8451;</h1>
      <h5 className="text-lg pb-2">{weather?.current.condition.text} <img src={weather?.current.condition.icon} alt='Weather conditions' /> </h5>
      {/* <h5 className="text-lg pb-2">
        <strong>H</strong>:30&#8451; <strong>L</strong>:16&#8451;
      </h5> */}
      <h5 className="text-lg pb-2">
        <strong>Humidity</strong>: {weather?.current.humidity}
      </h5>
      <h5 className="text-lg pb-2">
        <strong>Pressure</strong>: {weather?.current.pressure_mb} millibar
      </h5>
      <h5 className="text-lg pb-2">
        <strong>Visibility</strong>: {weather?.current.vis_km} km
      </h5>
      <h5 className="text-lg pb-10">
        <strong>Wind Speed</strong>: {weather?.current.wind_kph} kph, {weather?.current.wind_degree}&deg;
      </h5>
    </div>
  );
}

export default WeatherBox;
