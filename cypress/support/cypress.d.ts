/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Wait for Angular to be ready
       */
      waitForAngular(): Chainable<void>
  
      /**
       * Navigate to a specific page
       * @param page - The page to navigate to ('home' | 'settings' | custom path)
       */
      navigateTo(page: string): Chainable<void>
  
      /**
       * Add a new grade
       * @param gradeData - The grade data to add
       */
      addGrade(gradeData: {
        minPercentage?: number
        symbolicGrade?: string
        descriptiveGrade?: string
      }): Chainable<void>
  
      /**
       * Edit an existing grade
       * @param gradeSymbol - The symbol of the grade to edit
       * @param newData - The new data for the grade
       */
      editGrade(
        gradeSymbol: string,
        newData: {
          minPercentage?: number
          symbolicGrade?: string
          descriptiveGrade?: string
        },
      ): Chainable<void>
  
      /**
       * Delete a grade
       * @param gradeSymbol - The symbol of the grade to delete
       */
      deleteGrade(gradeSymbol: string): Chainable<void>
  
      /**
       * Check responsive behavior across different viewports
       */
      checkResponsive(): Chainable<void>
    }
  }
  