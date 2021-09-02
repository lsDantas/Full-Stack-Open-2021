import React, { useState } from "react";
import FilterForm from './components/FilterForm'
import NewPhoneForm from "./components/NewPhoneForm";
import NumberList from "./components/NumberList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

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
      setPersons(persons.concat(newEntry));
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
