/// <reference types="cypress" />

describe("Basic Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("should load the application successfully", () => {
    cy.get('h1').should("contain", "Welcome Home");
  
    cy.waitForAngular();
  })

  it("should display sidebar navigation", () => {
    cy.get('.sidebar').should("be.visible");
    cy.get('.logo').should("be.visible");
    cy.get('[data-qa="nav-item-home"]').should("be.visible");
    cy.get('[data-qa="nav-item-thresholds"]').should("be.visible");
  })

  it("should navigate between pages using sidebar", () => {
    cy.get('[data-qa="nav-item-thresholds"]').click();
    cy.url().should("include", "/thresholds");
    cy.get('.grade-list').should("be.visible");

    cy.get('[data-qa="nav-item-home"]').click();
    cy.url().should("include", "/home");
    cy.get('.home-content').should("be.visible");

    cy.get('[data-qa="nav-item-user"]').click();
    cy.url().should("include", "/user");
    cy.get('.user-content').should("be.visible");
  })

  it("should toggle sidebar on desktop", () => {
    cy.viewport(1280, 720);
    cy.get('.sidebar').should("not.have.class", "collapsed");

    cy.get('[data-qa="sidebar-toggle-button"]').click();
    cy.get('.sidebar').should("have.class", "collapsed");

    cy.get('[data-qa="sidebar-toggle-button"]').click();
    cy.get('.sidebar').should("not.have.class", "collapsed");
  })
})
