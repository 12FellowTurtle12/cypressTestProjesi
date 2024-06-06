describe('Form Test', () => {
    it('should submit form successfully', () => {
      cy.visit('/');
      cy.get('#email').type('test@example.com');
      cy.get('#password').type('password');
      cy.get('#terms').check();
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/success');
    });
  
    it('should display error messages for invalid input', () => {
      cy.visit('/');
      // Email invalid
      cy.get('#email').type('invalid-email');
      cy.get('#password').type('password');
      cy.get('#terms').check();
      cy.get('button[type="submit"]').click();
      cy.get('.error-message').should('have.length', 1);
      cy.get('.error-message').should('contain', 'Please enter a valid email address.');
      cy.get('button[type="submit"]').should('be.disabled');
  
      // Password invalid
      cy.get('#email').clear().type('test@example.com');
      cy.get('#password').clear().type('short');
      cy.get('button[type="submit"]').click();
      cy.get('.error-message').should('have.length', 2);
      cy.get('.error-message').should('contain', 'Password must be at least 8 characters long.');
      cy.get('button[type="submit"]').should('be.disabled');
  
      // Terms not accepted
      cy.get('#email').clear().type('test@example.com');
      cy.get('#password').clear().type('password');
      cy.get('#terms').uncheck();
      cy.get('button[type="submit"]').click();
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });