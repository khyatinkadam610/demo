// describe("Search",()=>{
//   it("Search string",()=>{
//   cy.login('test12@gmail.com','123456');
//   cy.wait(3000);
//   cy.get('input[type="search"]').type("naruto");
//   cy.get('.btn').contains('Search').should('be.visible').click();
//   cy.get('.btn').contains('View Details').click();
//   cy.scrollTo('bottom');
//   cy.wait(3000);
//   cy.get('.btn').contains('Back').click();
//   })
//   it("Search empty",()=>{
//   cy.login('test12@gmail.com','123456');
//   cy.wait(3000);
//   // cy.get('input[type="search"]').type("naruto");
//   cy.get('.btn').contains('Search').should('be.visible').click();
//   cy.get('.btn').contains('View Details').should('be.visible').eq(1).click();
//   cy.scrollTo('bottom');
//   cy.wait(3000);
//   cy.get('.btn').contains('Back').click();
//   })
//   it("Search impossible string",()=>{
//   cy.login('test12@gmail.com','123456');
//   cy.wait(3000);
//   cy.get('input[type="search"]').type("abc");
//   cy.get('.btn').contains('Search').should('be.visible').click();


//   })
// })

//   describe("Inside KartWheel",()=>{
//     it("filter by price",()=>{
//     cy.login('test12@gmail.com','123456');
//     cy.wait(3000);
//     cy.get('input[type="search"]').type("naruto");
//     cy.get('.btn').contains('Search').should('be.visible').click();
//     cy.get('.btn').contains('View Details').should('be.visible').click();
//     cy.scrollTo('bottom');
//     cy.wait(3000);
//     cy.get('.btn').contains('Back').click();
//     })
//   })

import { Given, Then,When } from 'cypress-cucumber-preprocessor/steps';
Given("i am on shop page",()=>{
    cy.login('test12@gmail.com','123456');
    cy.wait(3000);
});

When("i search for valid string",()=>{
   
  cy.get('input[type="search"]').type("naruto");
  cy.get('.btn').contains('Search').should('be.visible').click();
})

Then("i should see result",()=>{
    cy.get('.btn').contains('View Details').should('be.visible');
})

When("i search for invalid string",()=>{
    cy.wait(3000);
    cy.get('input[type="search"]').type("xyz");
    cy.get('.btn').contains('Search').should('be.visible').click();
})

Then("i should not see result",()=>{
    cy.get('.btn').not('View Details');
})

When("i search for empty string",()=>{
    cy.wait(3000);
    cy.get('.btn').contains('Search').should('be.visible').click();
})
When("i filler product",()=>{
    cy.wait(3000);
    cy.get('#from').type('1000');
    cy.get('#to').type('20000');
    cy.get('#button').contains('Filter by price').should('be.visible').click();
})
When("i filler product with no results",()=>{
    cy.wait(3000);
    cy.get('#from').type('0');
    cy.get('#to').type('100');
    cy.get('#button').contains('Filter by price').should('be.visible').click();
})
When("i clicked view details",()=>{
    cy.wait(3000);
    cy.get('.btn').contains('View Details').should('be.visible').eq(0).click();
    cy.scrollTo('bottom');
    cy.wait(3000);
    cy.get('.btn').contains('Back').click();
})