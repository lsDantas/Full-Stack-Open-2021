import React, { useState } from "react";

const Header = ({ title }) => {
  return (
    <h2>{title}</h2>
  );
}

const FilterForm = ({filter, changeFilter}) => {
  return (
    <div>
      Filter shown with a
      <input
        name={filter}
        onChange={changeFilter}
      />
    </div>
  );
}

const NewPhoneForm = ({entry, addHandler, changeEntry}) => {
  return (
    <>
      <Header title="Add a New Entry" />
      <form onSubmit={addHandler}>
        <div>
          Name:
          <input
            name={entry.name}
            onChange={changeEntry("name")}
          />
          <br></br>
          Number:
          <input 
            number={entry.number}
            onChange={changeEntry("number")}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

const NumberList = ({persons, filter}) => {
  const matchesSearchTerm = (person) => person.name.includes(filter);
  const selected_people = persons.filter(matchesSearchTerm)

  return (
    <>
      <Header title="Numbers" />
      {selected_people.map(person =>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  // Search Filter
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
    const blankEntry = {
      name: '',
      number: ''
    };
    setNewEntry(blankEntry);
    event.target.reset()
  }

  return (
    <div>
      <Header title="Phonebook" />
      <FilterForm filter={newFilter} changeFilter={handleFilterChange} />
      <NewPhoneForm entry={newEntry} addHandler={addPerson} changeEntry={handleEntryChange} />
      <NumberList persons={persons} filter={newFilter} />
      <br></br>
      <div>Debug (Name): {newEntry.name}</div>
      <br></br>
      <div>Debug (Filter): {newFilter}</div>
    </div>
  );
}

export default App;
