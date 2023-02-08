import '../support/commands';
// const customCommands = require('./commands');
// module.exports = {
//     commands:customCommands
// }
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})