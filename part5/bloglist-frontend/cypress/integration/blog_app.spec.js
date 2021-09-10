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

      cy.get('#failure-notification').should('have.css', 'color', 'rgb(255, 0, 0)')
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

      cy.get('#create-blog-title').type(blog.title);
      cy.get('#create-blog-author').type(blog.author);
      cy.get('#create-blog-url').type(blog.url);
      cy.get('#create-blog-button').click()

      cy.get('#success-notification').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.should('not.contain', 'create-blog-form');
      cy.get('#blog-list').should('contain', blog.title);
    });

    it('a user can like a blog', function () {
      cy.get('#blog-list').find('button').click();
      cy.contains('Like').click();

      cy.contains('Likes').parent().should('contain', 'Likes 1');
    });
  });

});