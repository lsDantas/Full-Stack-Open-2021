import React, { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    // Avoid Duplicates
    const includedIn = (set, object) => 
      set.map(p => p.title).includes(object.title);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if(!includedIn(dataInStore.allBooks, addedBook)) {
      const updatedBooks = dataInStore.allBooks.concat(addedBook);
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: updatedBooks }
      })
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      window.alert(`New book "${book.title}" added!`);

      updateCacheWith(book);
    }
  })
  
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

  const genreUpdateHandler = ({ target }) => {
    setGenre(target.value);
    props.setUpdateToggle(!props.updateToggle);
  }

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
        <button key={`button-${genre}`} value={genre} onClick={genreUpdateHandler}>{genre}</button>
      )}
      <button value="" onClick={genreUpdateHandler}>all genres</button>
    </div>
  );
};

export default Books;
