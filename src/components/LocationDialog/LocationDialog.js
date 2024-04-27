import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LongContext } from "../../App";
import LocationDropdown from "../LocationDropdown/LocationDropdown";

function LocationDialog() {
  const { longi, setLongi, lati, setLati } = useContext(LongContext);
  const navigate = useNavigate();

  // const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;
  // `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;
  // &q=${lati,longi}&aqi=yes

  const getData = (lati, longi) => {
    fetch(`${API_URL}&q=${lati},${longi}&aqi=yes`)
      .then((res) => res.json())
      .then((actualData) => console.log(actualData))
      // .then((actualData) => setLocation(`${actualData.location.name}, ${actualData.location.region}`))
      .catch((err) => {
        console.log(err.message);
      });
  };

  function handleClick() {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", typeof position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setLati(position.coords.latitude);
      setLongi(position.coords.longitude);
    });

    getData(lati, longi);
    // console.log(longi, lati);
    navigate("/location");
  }

  // useEffect(() => {
  //   fetch(`${API_URL}&q=${lati},${longi}&aqi=yes`)
  //     .then((res) => res.json())
  //     .then((actualData) => console.log(actualData))
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });

  return (
    <div className="shadow-lg shadow-slate-800 my-[5.5%] w-2/3 md:w-[30%] mx-auto flex flex-col items-center bg-white rounded-md">
      <div className="w-11/12 mt-7">
        <LocationDropdown />
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <hr className="w-24 border-black" />
        <p className="text-gray-400">or</p>
        <hr className="w-24 border-black" />
      </div>
      <div className="flex">
        <button
          className="px-6 py-2 mb-7 font-semibold rounded bg-sky-300 hover:bg-sky-500 flex items-center"
          onClick={handleClick}
        >
          <img className="w-6 mr-2" src={require("./location.png")} alt="hi" />
          Detect my location
        </button>
      </div>
    </div>
  );
}

export default LocationDialog;
