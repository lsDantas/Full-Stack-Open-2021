import React, { useEffect, useState } from "react";

import './index.css'

import personsService from './services/persons'

import SearchFilterForm from './components/SearchFilterForm';
import NewContactForm from "./components/NewContactForm";
import ContactList from "./components/ContactList";
import Notification from "./components/Notification";

const App = () => {

  // Contact Search Filter - Handle Input
  const [newFilter, setNewFilter] = useState('');

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  // Notifications
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const notificationDuration = 5000;

  const displaySuccessNotification = (name) => {
    setSuccessMessage(`Added ${name}`);
    setTimeout(() => {
      setSuccessMessage(null)
    }, notificationDuration);
  }

  const displayErrorNotification = (name) => {
    setErrorMessage(`Information of ${name} has already been removed from server`);
    setTimeout(() => {
      setErrorMessage(null)
    }, notificationDuration);
  }

  // New Contact Form - Handle Input
  const [ newContact, setNewContact ] = useState({
    name: '',
    number: ''
  });

  const handleContactInput = (field) => {
    const contactInputHandler = (event) => {
      const updatedContactEntry = {
        ...newContact,
        [field] : event.target.value
      };
      setNewContact(updatedContactEntry);
    }
    return contactInputHandler;
  }

  // Create New Contact
  const addContact = (event) => {
    event.preventDefault();

    const matchesNewName = (person) => person.name === newContact.name;
    if ( contacts.some(matchesNewName) === false ) {
      // Add Contact if New Person
      personsService
        .createPerson(newContact)
        .then(newPerson => setContacts(contacts.concat(newPerson)))
        .then(displaySuccessNotification(newContact.name));
    }
    else {
      // Request Permission to Overwrite Number if Old Contact
      const permissionMessage = `${newContact.name} is already added to the phonebook, replace the old number with a new one?`;
      if ( window.confirm(permissionMessage) ) {
        const id = contacts.find(matchesNewName).id;
        const updatedContact = { ...newContact, id : id };
        
        personsService
          .updatePerson(updatedContact)
          .then( (newPerson) => {
            const updatedPersons = contacts.map( person => 
              (person.id === newPerson.id) ? updatedContact : person
            );
            setContacts(updatedPersons);
          });
      }
    }

    // Clear New Contact Form
    setNewContact({ name : '', number : '' });
    event.target.reset()
  }

  const removeContact = (id) => {
    const contactRemovalHandler = (event) => {
      event.preventDefault();

      const selectedPersonName = contacts.find( person => person.id === id).name;
      const permissionMessage = `Delete ${selectedPersonName}?`;
      if (window.confirm(permissionMessage)) {
        personsService
          .deletePerson(id)
          .catch( () => {
            // Contact Already Removed in Server
            displayErrorNotification(selectedPersonName)
          })
          .finally( () => {
            // Remove Contact from Interface
            const allButRemoved = contacts.filter(person => person.id !== id);
            setContacts(allButRemoved);
          });

      }
    }
    
    return contactRemovalHandler;
  }

  // Contact List - Load from Server
  const [contacts, setContacts] = useState([]);

  const personsHook = () => {
    personsService
      .getPersons()
      .then(newPersons => setContacts(newPersons));
  }
  useEffect(personsHook, []);

  return (
    <div>
      <h1>Phonebook</h1> 
      <Notification message={errorMessage} notificationStyle="failureNotification"/>
      <Notification message={successMessage} notificationStyle="successNotification"/>
      <SearchFilterForm filterQuery={newFilter} changeFilterQuery={handleFilterChange} />

      <h2>Add New Entry</h2>
      <NewContactForm entry={newContact} addContactHandler={addContact} changeEntryHandler={handleContactInput} />

      <h2>Numbers</h2>
      <ContactList contacts={contacts} filterQuery={newFilter} deleteHandler={removeContact} />
      <br></br>
      <div>Debug (Name): {newContact.name}</div>
      <br></br>
      <div>Debug (Filter): {newFilter}</div>
    </div>
  );
}

export default App;
