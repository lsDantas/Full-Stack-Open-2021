import React, { useState } from "react";

const Header = ({ title }) => {
  return (
    <h2>{title}</h2>
  );
}

const NewPhoneForm = ({value, addHandler, changeHandler}) => {
  return (
    <form onSubmit={addHandler}>
      <div>
        name:
        <input
          value={value}
          onChange={changeHandler}
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
      {person.name}
      <br></br>
    </>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewname ] = useState('');

  // Add New People to Phonebook
  const handleNameChange = (event) => {
    setNewname(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name : newName
    };

    setPersons(persons.concat(personObject))
  }

  return (
    <div>
      <Header title="Phonebook" />
      <NewPhoneForm value={newName} addHandler={addPerson} changeHandler={handleNameChange} />

      <Header title="Numbers" />
      <NumberList persons={persons} />
      <br></br>
      <div>debug: {newName}</div>
    </div>
  );
}

export default App;
