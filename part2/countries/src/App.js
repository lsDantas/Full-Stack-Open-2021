import React, { useEffect, useState } from "react";

// Server Communication
import axios from 'axios'

// Components
import CountriesPanel from './components/CountriesPanel'
import SearchForm from './components/SearchForm'


const App = () => {
  // Load Countries List
  const [countries, setCountries] = useState([]);
  const countriesURI = "https://restcountries.eu/rest/v2/all";
  const loadCountries = response => setCountries(response.data);
  const countriesHook = () => {
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
  
  return (
    <div>
      <SearchForm query={newQuery} changeQuery={handleQueryChange} />
      <br></br>
      <CountriesPanel query={newQuery} countriesList={countries} />
    </div>
  );
}

export default App;
