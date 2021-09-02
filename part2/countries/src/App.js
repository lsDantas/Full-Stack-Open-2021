import React, { useEffect, useState } from "react";

// Server Communication
import axios from 'axios'

// Components
import CountriesPanel from './components/CountriesPanel'
import SearchForm from './components/SearchForm'


const App = () => {
  // Countries List
  const [countries, setCountries] = useState([]);
  const countriesURI = "https://restcountries.eu/rest/v2/all";

  // Display Toggle for Country Cards
  const addDisplayToggle = (country) => {
    return { ...country, show: false }
  }

  // Load Countries from Server
  const countriesHook = () => {

    const loadCountries = response => {
      const updatedCountries = response.data.map(addDisplayToggle);
      setCountries(updatedCountries);
    }

    axios
      .get(countriesURI)
      .then(loadCountries);
  };

  useEffect(countriesHook, []);

  // Search Query
  const [newQuery, setNewQuery] = useState('');
  const handleQueryChange = (event) => {
    setNewQuery(event.target.value);
  }

  // Update Display
  const handleToggle = (changing_country) => {
    const handler = () => {
      // Update only Toggled Country
      const updateToggledCountry = (country) => {
        if (country.name === changing_country) {
          const updatedEntry = {
            ...country,
            show: !country.show
          };
          return updatedEntry;
        }
        else {
          return country;
        }
      }

      // Update General Countries List
      const updatedCountries = () => {
        return countries.map(updateToggledCountry);
      }
      setCountries(updatedCountries);
    }

    return handler;
  }

  // Weather Data

  const [weatherData, setWeatherData] = useState({
    temperature: '',
    wind_speed: '',
    wind_direction: ''
  });

  // Fetch Update Weather Data
  const weatherSelect = (city) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const weatherURI = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`;

    const weatherHook = () => {
      const loadWeather = response => {
        console.log(response.data);
        console.log(api_key);
        const currentWeather = response.data.current;
        const newWeatherData = {
          temperature: currentWeather.temperature,
          wind_speed: currentWeather.wind_speed,
          wind_direction: currentWeather.wind_dir
        };
        setWeatherData(newWeatherData);
      }

      axios
        .get(weatherURI)
        .then(loadWeather);
    };

    return weatherHook;
  }
  
  
  return (
    <div>
      <SearchForm query={newQuery} changeQuery={handleQueryChange} />
      <br></br>
      <CountriesPanel query={newQuery} countriesList={countries} changeToggle={handleToggle} weather={weatherData} checkWeather={weatherSelect} />
    </div>
  );
}

export default App;
