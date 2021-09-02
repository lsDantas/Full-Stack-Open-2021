import React, { useState } from "react";

const Header = ({ title }) => {
  return (
    <h2>{title}</h2>
  );
}

const NewPhoneForm = ({entry, addHandler, changeEntry}) => {
  return (
    <form onSubmit={addHandler}>
      <div>
        name:
        <input
          name={entry.name}
          onChange={changeEntry("name")}
        />
        <br></br>
        number:
        <input 
          number={entry.number}
          onChange={changeEntry("number")}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const NumberList = ({persons}) => {
  return (
    <>
      {persons.map(person =>
          <Person key={person.name} person={person} />
      )}
    </>
  );
}

const Person = ({person}) => {
  return (
    <>
      {person.name} {person.number}
      <br></br>
    </>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number : "994" }
  ]);

  // Phonebook New Entry State
  const [ newEntry, setNewEntry ] = useState({
    name: '',
    number: ''
  });

  // Add New Entry to Phonebook
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
    /*
    const blankEntry = {
      name: '',
      number: ''
    };
    setNewEntry(blankEntry);
    */
  }

  return (
    <div>
      <Header title="Phonebook" />
      <NewPhoneForm entry={newEntry} addHandler={addPerson} changeEntry={handleEntryChange} />

      <Header title="Numbers" />
      <NumberList persons={persons} />
      <br></br>
      <div>debug: {newEntry.name}</div>
    </div>
  );
}

export default App;
