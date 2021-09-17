import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  if (!props.show) {
    return null;
  }

  // Loading Author Data
  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  // Updating Author
  const setBirthYear = async (event) => {
    event.preventDefault();

    // In case user never interacted with Select
    const defaultOption = authors[0].name;
    const authorName = (authors && !name)
      ? defaultOption
      : name

    updateAuthor({ variables: { name: authorName, setBornTo: Number(born) } });
    
    setName('');
    setBorn('');
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br></br>
      <h3>Set Birth Year</h3>
      <form onSubmit={setBirthYear}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => 
            <option 
              key={`option-${author.name}`} 
              value={author.name}>
                {author.name}
            </option>
          )}
        </select>
        <div>
          Born:
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>

    </div>
  );
};

export default Authors;
