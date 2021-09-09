import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react'

import BlogEntry from './BlogEntry';

test('BlogEntry renders blog\'s title and author, but not url and number of likes.', () => {

  const mockBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 15,
    user: {
      username: 'Blog Owner',
    },
  };
  const mockUser = {
    username: 'Token User',
  };

  const component = render( <BlogEntry
    blog={mockBlog}
    user={mockUser}
  />);

  expect(component.container).toHaveTextContent(mockBlog.title);
  expect(component.container).toHaveTextContent(mockBlog.author);
  expect(component.container).not.toHaveTextContent(mockBlog.url);
  expect(component.container).not.toHaveTextContent('Likes');
});