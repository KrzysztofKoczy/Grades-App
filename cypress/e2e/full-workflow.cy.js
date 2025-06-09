///  <reference types="cypress" />

describe("Complete Application Workflow", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("should complete full grading system workflow", () => {
    cy.get('[data-qa="home-content"]').should("be.visible");

    cy.get('[data-qa="nav-item-thresholds"]').click();
    cy.url().should("include", "/thresholds");
    cy.get('[data-qa="grade-list"]').should("be.visible");

    cy.get('[data-qa^="grade-item-"]').should("have.length.at.least", 1);;
    cy.get('[data-qa^="grade-item-"]').then(($items) => {
      const initialGradeCount = $items.length;

      cy.fixture("grades").then((grades) => {
        const newGrade = {
          minPercentage: 5,
          symbolicGrade: "D+",
          descriptiveGrade: "Below average but showing some improvement",
        };
    
        cy.addGrade(newGrade);
        cy.get('[data-qa^="grade-item-"]').should("have.length", initialGradeCount + 1);
    
        const newItemSelector = `[data-qa="grade-item-1"]`;
    
        cy.get(newItemSelector).within(() => {
          cy.get(".grade-symbol")
            .should("be.visible")
            .and("have.text", newGrade.symbolicGrade);

            cy.get('[data-qa="grade-range"]')
            .should("be.visible")
            .and("contain.text", newGrade.minPercentage);
          
        });

        cy.editGrade(1, {
          minPercentage: 40,
          descriptiveGrade: "Updated: Below average with minimal improvement",
        });

        cy.get('[data-qa="grade-item-2"]').click();
        cy.get('[data-qa="min-percentage-input"]').should("have.value", "40");
        cy.get('[data-qa="descriptive-grade-input"]').should("contain.value", "Updated:");
        cy.get('[data-qa="close-btn"]').click()

        cy.get('[data-qa="add-grade-btn"]').click();
        cy.get('[data-qa="min-percentage-input"]').type("50");
        cy.get('[data-qa="symbolic-grade-input"]').type("CONFLICT");
        cy.wait(400);

        cy.get('[data-qa="close-btn"]').click();

        cy.deleteGrade(2);

        cy.get('[data-qa^="grade-item-"]').should("have.length", initialGradeCount);
      })
    })

    cy.get('[data-qa="nav-item-home"]').click();
    cy.url().should("include", "/home");
  })
})
