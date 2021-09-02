import React, { useEffect, useState } from "react";

// Services
import personsService from './services/persons'

// Components
import FilterForm from './components/FilterForm'
import NewPhoneForm from "./components/NewPhoneForm";
import NumberList from "./components/NumberList";

const App = () => {
  // Load Contact List from Server
  const [persons, setPersons] = useState([]);

  const personsHook = () => {
    personsService
      .getPersons()
      .then(newPersons => setPersons(newPersons));
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
      personsService
        .createPerson(newEntry)
        .then(newPerson => setPersons(persons.concat(newPerson)));
    }
    else {
      // Issue Alert Otherwise
      window.alert(`${newEntry.name} is already added to the phonebook`);
    }

    // Clear Entry
    setNewEntry({ name : '', number : '' });
    event.target.reset()
  }

  const removePerson = (id) => {
    const handler = (event) => {
      event.preventDefault();
      
      personsService
        .deletePerson(id)
        .then( () => {
          const allButRemoved = persons.filter(person => person.id !== id);
          setPersons(allButRemoved);
        });
    }
    
    return handler;
  }

  return (
    <div>
      <h1>Phonebook</h1> 
      <FilterForm filter={newFilter} changeFilter={handleFilterChange} />

      <h2>Add New Entry</h2>
      <NewPhoneForm entry={newEntry} addHandler={addPerson} changeEntry={handleEntryChange} />

      <h2>Numbers</h2>
      <NumberList persons={persons} filter={newFilter} deleteHandler={removePerson} />
      <br></br>
      <div>Debug (Name): {newEntry.name}</div>
      <br></br>
      <div>Debug (Filter): {newFilter}</div>
    </div>
  );
}

export default App;
