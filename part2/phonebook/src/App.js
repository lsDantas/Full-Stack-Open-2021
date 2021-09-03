import React, { useEffect, useState } from "react";

import './index.css'

// Services
import personsService from './services/persons'

// Components
import FilterForm from './components/FilterForm'
import NewPhoneForm from "./components/NewPhoneForm";
import NumberList from "./components/NumberList";
import SuccessNotification from "./components/SuccessNotification";

const App = () => {

  // Load Contact List from Server
  const [persons, setPersons] = useState([]);

  const personsHook = () => {
    personsService
      .getPersons()
      .then(newPersons => setPersons(newPersons));
  }
  useEffect(personsHook, []);

  // Notifications
  const [successMessage, setSuccessMessage] = useState(null)

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
      // Prepare Sucess Notification
      const displayNotification = () => {
        setSuccessMessage(`Added ${newEntry.name}`);
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
      }

      // Send New Person to Server
      personsService
        .createPerson(newEntry)
        .then(newPerson => setPersons(persons.concat(newPerson)))
        .then(displayNotification);
    }
    else {
      // Ask for Permission to Overwrite Old Number
      if ( window.confirm(`${newEntry.name} is already added to the phonebook, replace the old number with a new one?`) ) {
        // Build Updated Person Entry
        const id = persons.find(matchesNewName).id;
        const newPersonWithID = { ...newEntry, id : id };
        
        personsService
          .updatePerson(newPersonWithID)
          .then( (newPerson) => {
            console.log(newPerson)
            const updatedPersons = persons.map( person => {
              if (person.id === newPerson.id ) {
                return newPersonWithID;
              }
              else {
                return person;
              }
            });
            setPersons(updatedPersons);
          });
      }
    }

    // Clear Entry
    setNewEntry({ name : '', number : '' });
    event.target.reset()
  }

  const removePerson = (id) => {
    const handler = (event) => {
      event.preventDefault();

      const selectedPersonName = persons.find( person => person.id === id).name;
      if (window.confirm(`Delete ${selectedPersonName}?`)) {
        personsService
          .deletePerson(id)
          .then(() => {
            const idMismatch = person => person.id !== id;
            const allButRemoved = persons.filter(idMismatch);
            setPersons(allButRemoved);
          });

      }
    }
    
    return handler;
  }

  return (
    <div>
      <h1>Phonebook</h1> 
      <SuccessNotification message={successMessage} />
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
