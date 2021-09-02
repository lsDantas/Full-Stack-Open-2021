import React, { useEffect, useState } from "react";

// Server Communication
import axios from 'axios'

// Components
import FilterForm from './components/FilterForm'
import NewPhoneForm from "./components/NewPhoneForm";
import NumberList from "./components/NumberList";

const App = () => {
  // Load Contact List from Server
  const [persons, setPersons] = useState([]);
  const personsURI = 'http://localhost:3001/persons'
  const loadPersons = response => setPersons(response.data);
  const personsHook = () => {
    axios
      .get(personsURI)
      .then(loadPersons);
  }

  useEffect(personsHook, []);

  // Filter for Searching
  const [newFilter, setNewFilter ]= useState('');

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  // New Entry
  const [ newEntry, setNewEntry ] = useState({
    name: '',
    number: ''
  });

  const handleEntryChange = (field) => {
    const handler = (event) => {
      const updatedEntry = {
        ...newEntry,
        [field] : event.target.value
      };
      setNewEntry(updatedEntry);
    }
    return handler;
  }

  const addPerson = (event) => {
    event.preventDefault();

    // Add Person if New
    const matchesNewName = (person) => person.name === newEntry.name;
    if ( persons.some(matchesNewName) === false ) {
      // Send New Person to Server
      const personsURL = "http://localhost:3001/persons";
      axios
        .post(personsURL, newEntry)
        .then(response => setPersons(persons.concat(response.data)));
    }
    else {
      // Issue Alert Otherwise
      window.alert(`${newEntry.name} is already added to the phonebook`);
    }

    // Clear Entry
    setNewEntry({ name : '', number : '' });
    event.target.reset()
  }

  return (
    <div>
      <h1>Phonebook</h1> 
      <FilterForm filter={newFilter} changeFilter={handleFilterChange} />

      <h2>Add New Entry</h2>
      <NewPhoneForm entry={newEntry} addHandler={addPerson} changeEntry={handleEntryChange} />

      <h2>Numbers</h2>
      <NumberList persons={persons} filter={newFilter} />
      <br></br>
      <div>Debug (Name): {newEntry.name}</div>
      <br></br>
      <div>Debug (Filter): {newFilter}</div>
    </div>
  );
}

export default App;
