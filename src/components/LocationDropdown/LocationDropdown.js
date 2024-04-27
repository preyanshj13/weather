import React, { useState, useContext } from "react";
import { Country, State, City } from "country-state-city";
// import { useFormik } from "formik";
import Select from "react-select";
import { LongContext } from "../../App";
import { useNavigate } from "react-router-dom";
// /dist/declarations/src/Select

function LocationDropdown() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { lati, longi, setLati, setLongi } = useContext(LongContext);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    // console.log(selectedCountry, selectedState, selectedCity);
    if (!selectedCity && !selectedState) {
      setLati(selectedCountry.latitude);
      setLongi(selectedCountry.longitude);
    } else if (!selectedCity) {
      setLati(selectedState.latitude);
      setLongi(selectedState.longitude);
    } else {
      setLati(selectedCity.latitude);
      setLongi(selectedCity.longitude);
    }

    navigate("/location");
    console.log(longi, lati);
  }

  return (
    <div className="App">
      <Select
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        className="mb-3"
        placeholder="Select Country"
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
          // setLati(selectedCountry?.latitude);
          // setLongi(selectedCountry?.longitude);
        }}
      />

      <Select
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        className="mb-3"
        placeholder="Select State"
        value={selectedState}
        onChange={(item) => {
          setSelectedState(item);
          // setLati(selectedState?.latitude);
          // setLongi(selectedState?.longitude);
        }}
      />

      <Select
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        className="mb-3"
        placeholder="Select City"
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item);
          // setLati(selectedCity?.latitude);
          // setLongi(selectedCity?.longitude);
        }}
      />
      <button
        className="px-6 py-1 my-2 font-semibold rounded bg-sky-300 hover:bg-sky-500"
        type="submit"
        onClick={handleClick}
      >
        Get Weather
      </button>
    </div>
  );
}

export default LocationDropdown;
