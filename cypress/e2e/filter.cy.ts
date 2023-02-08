// describe("Filter",()=>{
//     it("Filter By Price",()=>{
//         cy.login('test12@gmail.com','123456');
//         cy.get('#from').type('1000');
//         cy.get('#to').type('20000');
//         cy.get('#button').contains('Filter by price').should('be.visible').click();
//     })
//     it("Filter By Price part 2 no items found",()=>{
//         cy.login('test12@gmail.com','123456');
//         cy.get('#from').type('0');
//         cy.get('#to').type('100');
//         cy.get('#button').contains('Filter by price').should('be.visible').click();
//     })
// })