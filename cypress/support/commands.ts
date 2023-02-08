
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string,password:string): typeof login;
  }
}

function login(email: string, password:string): void {
  cy.visit("http://localhost:4200/login");
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('.btn').contains('Login').should('be.visible').click();
}
Cypress.Commands.add('login', login);