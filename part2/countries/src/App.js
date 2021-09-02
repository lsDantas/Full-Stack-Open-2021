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
  
  return (
    <div>
      <SearchForm query={newQuery} changeQuery={handleQueryChange} />
      <br></br>
      <CountriesPanel query={newQuery} countriesList={countries} changeToggle={handleToggle} />
    </div>
  );
}

export default App;
