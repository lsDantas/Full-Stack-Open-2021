import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, GET_ACTIVE_USER} from '../queries';

const Recommendations = (props) => {
  const username = window.localStorage.getItem('books-app-username');

  // Queries
  const resultBooks = useQuery(ALL_BOOKS);
  const resultUser = useQuery(GET_ACTIVE_USER, 
    { variables: { username } }
  );

  if (!props.show) {
    return null;
  }

  // Wait for Queries to Load
  if (resultBooks.loading || resultUser.loading) {
    return <div>Loading...</div>;
  }

  const books = resultBooks.data.allBooks;
  const favoriteGenre = resultUser.data.me.favoriteGenre;
  
  const matchingGenre = (book) => book.genres.includes(favoriteGenre);
  const displayedBooks = books.filter(matchingGenre);

  return (
    <div>
      <h2>Recommendations</h2>
      <br></br>
      Books in your favorite genre: <b></b>
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
          {displayedBooks.map((book) =>
            <tr key={`entry-${book.title}`}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
