import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECOMMENDATIONS} from '../queries';

const Recommendations = (props) => {
  const username = window.localStorage.getItem('books-app-username');

  const result = useQuery(GET_RECOMMENDATIONS, { 
    variables: { username }
  });

  if (!props.show) {
    return null;
  }

  // Wait for Queries to Load
  if (result.loading) {
    return <div>Loading...</div>;
  }
  
  const recommendedBooks = result.data.getRecommendations;

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
          {recommendedBooks.map((book) =>
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
