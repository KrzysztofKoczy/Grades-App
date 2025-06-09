/// <reference types="cypress" />

Cypress.Commands.add("waitForAngular", () => {
  cy.window().should("have.property", "ng");
  cy.wait(500);
})

Cypress.Commands.add("navigateTo", (page) => {
  const routes = {
    home: "/home",
    settings: "/settings",
  };

  cy.visit(routes[page] || page);
  cy.waitForAngular();
})

Cypress.Commands.add("addGrade", (gradeData) => {
  cy.get('[data-qa="add-grade-btn"]').click();
  cy.get('[data-qa="grade-details"]').should("be.visible");

  if (gradeData.minPercentage !== undefined) {
    cy.get('[data-qa="min-percentage-input"]').clear().type(gradeData.minPercentage.toString());
  }

  if (gradeData.symbolicGrade) {
    cy.get('[data-qa="symbolic-grade-input"]').clear().type(gradeData.symbolicGrade);
  }

  if (gradeData.descriptiveGrade) {
    cy.get('[data-qa="descriptive-grade-input"]').clear().type(gradeData.descriptiveGrade);
  }

  cy.get('[data-qa="submit-btn"]').click();
})

Cypress.Commands.add("editGrade", (gradeIndex, newData) => {
  cy.get(`[data-qa="grade-item-${gradeIndex}"]`).click();
  cy.get('[data-qa="grade-details"]').should("be.visible");

  if (newData.minPercentage !== undefined) {
    cy.get('[data-qa="min-percentage-input"]').clear().type(newData.minPercentage.toString());
  }

  if (newData.symbolicGrade) {
    cy.get('[data-qa="symbolic-grade-input"]').clear().type(newData.symbolicGrade);
  }

  if (newData.descriptiveGrade) {
    cy.get('[data-qa="descriptive-grade-input"]').clear().type(newData.descriptiveGrade);
  }

  cy.get('[data-qa="submit-btn"]').click();
})

Cypress.Commands.add("deleteGrade", (index) => {
  cy.get(`[data-qa="delete-button-${index}"]`).click();
  cy.get('[data-qa="modal"]').should("be.visible");
  cy.get('[data-qa="confirm-delete-btn"]').click();
})


