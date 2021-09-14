describe('Blog app', function() {
  beforeEach(function() {
    // Clear Database and Visit Page
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.get('#login-form').contains('Log in to the Application');
  });

  describe('Login', function() {
    beforeEach(function() {
      // Create User
      const user = {
        name: 'Test Dummy',
        username: 'dummy',
        password: '123456'
      };

      cy.createUser(user);
    });

    it('Succeeds with the correct credentials', function() {
      cy.get('#login-username').type('dummy');
      cy.get('#login-password').type('123456');
      cy.get('#login-button').click();

      cy.contains('Test Dummy logged-in');
    });

    it('Fails with wrong credentials.', function() {
      cy.get('#login-username').type('dummy');
      cy.get('#login-password').type('wrongpassword');
      cy.get('#login-button').click();

      cy.get('.alert-danger').should('have.css', 'color', 'rgb(114, 28, 36)')
      cy.should('not.contain' ,'Test Dummy logged-in');
    });
  });

  describe('When logged in...', function() {
    beforeEach(function() {
      // Create User
      const user = {
        name: 'Test Dummy 2',
        username: 'dummy',
        password: '123456',
      };

      const blog = {
        title: 'Full Stack Open',
        author: 'Various authors',
        url: 'https://fullstackopen.com',
        likes: 10,
      };

      cy.createUser(user)
        .then( () => {
          cy.login({ username: user.username, password: user.password });
        })
        .then( () => {
          cy.createBlog(blog);
        })
    });

    it('a blog can be created.', function() {
      const blog = {
        title: 'Lorem Ipsum',
        author: 'No One',
        url: 'http:www.example.com',
      };

      cy.get('#create-blog-toggle-button').click();

      cy.get('[name=titleText]').type(blog.title);
      cy.get('[name=authorText]').type(blog.author);
      cy.get('[name=urlText]').type(blog.url);
      cy.get('#create-blog-button').click()

      cy.get('.alert-success').should('have.css', 'color', 'rgb(21, 87, 36)')
      cy.should('not.contain', 'create-blog-form');
      cy.get('#blog-list').should('contain', blog.title);
    });

    it('a user can like a blog.', function () {
      cy.contains('Full Stack Open - Various authors').click();

      cy.contains('Likes').parent().should('contain', 'Likes 1');
    });

    it('a user can add a comment to a blog', function() {
      const commentText = 'TestOpinion'
      cy.contains('Full Stack Open - Various authors').click();

      cy.get('input[name=commentText').type(commentText);
      cy.get('#add-comment-button').click();

      cy.get('.alert-success').should('have.css', 'color', 'rgb(21, 87, 36)')
      cy.get('.list-group-item').should('contain', commentText);
    });

    it('a user who created a blog can delete it.', function() {
      cy.contains('Full Stack Open - Various authors').click();
      cy.get('#remove-blog-button').click();

      cy.on('window:confirm', (str) => expect(str).to.eq('Are you sure you want to delete Full Stack Open by Various authors?'));

      cy.should('not.contain', 'Full Stack Open');
    });

    it('users can be viewed in a list.', function() {
      cy.get('a').contains('Users').click();
      cy.get('td').should('contain', 'Test Dummy 2');
    });

    it('individual user pages can be accessed.', function () {
      cy.get('a').contains('Users').click();
      cy.get('td a').click();
      cy.get('#added-blog-list').should('contain', 'Added Blogs');
    });

    it('blogs are ordered by likes.', function() {
      const initialBlogs = [
        {
          title: 'Full Stack Open',
          author: 'Various authors',
          url: 'https://fullstackopen.com',
          likes: 10,
        },
        {
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 15,
        },
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 12,
        },
      ];

      // Create remaining two blogs
      cy.createBlog(initialBlogs[1])
        .then( () => {
          cy.createBlog(initialBlogs[2]);
        })
        .then( () => {
          // Check for Titles in Right Order
          cy.get('td a').eq(0).click();
          cy.get('.likes').should('contain', initialBlogs[1].likes);
          cy.visit('http://localhost:3000');

          cy.get('td a').eq(1).click();
          cy.get('.likes').should('contain', initialBlogs[2].likes);
          cy.visit('http://localhost:3000');

          cy.get('td a').eq(2).click();
          cy.get('.likes').should('contain', initialBlogs[0].likes);
        });
    });
  });

});