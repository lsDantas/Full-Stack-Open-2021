import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('');

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;
  
  // Identify Genres
  const genreEntries = books.map((book) => book.genres).flat();
  const genres = [...new Set(genreEntries)];

  const matchesGenre = (book) => {
    return (genre)
      ? book.genres.includes(genre)
      : true
  };

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              Title
            </th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {books.filter(matchesGenre).map((book) =>
            <tr key={`entry-${book.title}`}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br></br>
      {genres.map((genre) =>
        <button key={`button-${genre}`} value={genre} onClick={({ target }) => setGenre(target.value)}>{genre}</button>
      )}
      <button onClick={({ target }) => setGenre('')}>all genres</button>
    </div>
  );
};

export default Books;
