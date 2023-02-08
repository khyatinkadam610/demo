import { Given, Then,When } from 'cypress-cucumber-preprocessor/steps';
import { when } from 'cypress/types/jquery';

Given("I visit kartwheel", () => {

  cy.visit('http://localhost:4200/')

});

When("I do login",()=>{
  cy.login('test12@gmail.com','123456');
})

Then("I should see a title", () => {

  cy.wait(1000);
  cy.get('.navbar-brand').eq(1).should('be.visible')

});


When("I do login with incorrect password",()=>{
  cy.login('test12@gmail.com','123457');
})

Then("I should see an alert for password", () => {

  cy.wait(1000);
  cy.get('.alert-danger').contains('Invalid Password').should('be.visible');

});

When("I do login with incorrect email",()=>{
  cy.login('est12@gmail.com','123456');
})

Then("I should see an alert for email", () => {

  cy.wait(1000);
  cy.get('.alert-danger').contains('Email not found..no offense').should('be.visible');

});

When("I signin",()=>{
  cy.get('input[type="email"]').type("test12@gmail.com");
  cy.get('input[type="password"]').type("123456");
  cy.get('.btn').contains('Switch to Sign up').should('be.visible').click();
  cy.get('.btn').contains('Sign up').should('be.visible').click();
})

Then("I should see an alert for existing email",()=>{
  cy.get('.alert-danger').contains('This email address exists already ').should('be.visible');
})

When("i logout",()=>{
  cy.get('.btn').contains('LogOut').click();
})

Then("i should see login page",()=>{
  cy.get('.btn-primary').contains('Login').should('be.visible');
})
When("i add to kart",()=>{
  cy.get('.btn').contains('Add to Cart').should('be.visible').click();
  cy.wait(3000);
})
When("i delete from kart",()=>{
  cy.get('.btn-danger').eq(0).should('be.visible').click();
  cy.wait(3000);
})

When("i proceed to checkout",()=>{
  cy.get('.btn-success').contains('Proceed To CheckOut').should('be.visible').click();
})
When("i confirm order",()=>{
  cy.get('.btn-success').contains('Confirm Order').should('be.visible').click();
})

When("i check my orders",()=>{
  cy.get('.btn').contains('My Orders').should('be.visible').click();
})
Then("i should see modal",()=>{
  cy.get('.lead').contains('Receipt').should('be.visible');
})

When("i visit my orders",()=>{
  cy.visit('http://localhost:4200/orders');
  cy.wait(3000);
})
When("i add item",()=>{
  cy.get('.btn').contains('Add').should('be.visible').click();
  cy.wait(3000);
})