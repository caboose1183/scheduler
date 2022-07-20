describe("Navigation", () => {
  it.skip("should visit root", () => {
    cy.visit("/");
  });

  it.skip("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      //.should("have.css", "background-color", "rgb(242, 242, 242)");
      .should("have.class", "day-list__item--selected")
  });
});

// describe("Appointments", () => {
//   it("should book an interview", () => {
//     cy.visit("/");

//     cy.contains("[data-testid=day]", "Tuesday")
//       .click()

//     cy.get("[alt='Add']").first()
//       .click()

//     cy.get("[data-testid=student-name-input]")
//       .type('Sidney')

//     cy.get("[alt='Sylvia Palmer']")
//       .click()

//     cy.get('.button--confirm').click()
//   });
// });

// describe("Editing", () => {
//   it("should edit interview", () => {
//     cy.visit("/");

//     cy.contains("[data-testid=day]", "Tuesday")
//       .click()

//     cy.get("[alt='Edit']").first()
//       .click({force: true})

//     cy.get("[data-testid=student-name-input]")
//       .clear()
//       .type('Barry')

//     cy.get('.button--confirm').click()
//   });
// });

// describe("Canceling", () => {
//   it("should cancel interview", () => {
//     cy.visit("/");

//     cy.contains("[data-testid=day]", "Tuesday")
//       .click()

//     cy.get("[alt='Delete']").first()
//       .click({force: true})

//     cy.get(".button--danger").contains('Confirm')
//       .click()

//   });
// });