/// <reference types="cypress" />

describe("Responsive Design", () => {
  beforeEach(() => {
    cy.navigateTo("thresholds");
  })

  describe("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    })

    it("should display sidebar and main content side by side", () => {
      cy.get('[data-qa="sidebar"]').should("be.visible");
      cy.get('[data-qa="main-content"]').should("not.have.class", "sidebar-collapsed");
      cy.get('[data-qa="mobile-nav-button"]').should("not.exist");
    })
  })

  describe("Mobile View", () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    })

    it("should display mobile navigation", () => {
      cy.get('[data-qa="mobile-nav-button"]').should("be.visible");
      cy.get('[data-qa="sidebar"]').should("have.class", "collapsed");
    })

    it("should open sidebar when mobile toggle is clicked", () => {
      cy.get('[data-qa="mobile-nav-button"]').click();
      cy.get('[data-qa="sidebar"]').should("not.have.class", "collapsed");
      cy.get('[data-qa="sidebar-overlay"]').should("be.visible");
    })

    it("should auto-scroll to details on mobile", () => {
        cy.get('[data-qa="grade-item-1"]').first().click();

      cy.get('[data-qa="grade-details"]').should("be.visible");

      cy.get('[data-qa="grade-details-section"]').then(($element) => {
        const rect = $element[0].getBoundingClientRect();

        expect(rect.top).to.be.greaterThan(0);
      })
    })
  })

  describe("Responsive Transitions", () => {
    it("should handle viewport changes gracefully", () => {
      cy.viewport(1280, 720);
      cy.get('[data-qa="sidebar"]').should("be.visible").and("not.have.class", "collapsed");

      cy.viewport(375, 667)
      cy.get('[data-qa="mobile-nav-button"]').should("be.visible");
      cy.get('[data-qa="sidebar"]').should("have.class", "collapsed");
    })
  })
})
