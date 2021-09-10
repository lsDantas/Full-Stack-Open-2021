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

      cy.request('POST', 'http://localhost:3003/api/users', user);
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

});