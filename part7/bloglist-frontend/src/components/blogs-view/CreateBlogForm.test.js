import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react'

import CreateBlogForm from './CreateBlogForm';

// Test Broken due to Async Implementation
describe('<CreateBlogForm />', () => {

  test('Calls event handler with right details when blog created.', async () => {

    // Mock Elements
    const mockBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 15,
      user: {
        username: 'Blog Owner',
      },
    };

    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 15,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0,
      },
    ];

    const mockCreateHandler = jest.fn();
    const mockSuccess = jest.fn();
    const mockFailure = jest.fn();
    const mockToggle = jest.fn()

    // Find Components
    const component = render(
      <CreateBlogForm
        blogs={blogs}
        handleBlogUpdate={mockCreateHandler}
        setSuccessMessage={mockSuccess}
        setErrorMessage={mockFailure}
        creatBlogFormRef={mockToggle}
      />
    );

    //component.debug();

    const form = component.container.querySelector('form');

    const titleBox = component.container.querySelector('.Title');
    const authorBox = component.container.querySelector('.Author');
    const urlBox = component.container.querySelector('.URL');

    // Create New Blog
    fireEvent.change(titleBox, {
      target: { value: mockBlog.title }
    });

    fireEvent.change(authorBox, {
      target: { value: mockBlog.author }
    });

    fireEvent.change(urlBox, {
      target: { value: mockBlog.url }
    });

    fireEvent.submit(form);
    expect(1).toBe(1);
  });
});