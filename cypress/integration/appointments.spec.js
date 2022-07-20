beforeEach(() => {
  cy.request("GET", "/api/debug/reset")
  cy.visit("/");
});

describe("Appointments", () => {
  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()

    cy.get("[alt='Add']").first()
      .click()

    cy.get("[data-testid=student-name-input]")
      .type('Sidney')

    cy.get("[alt='Sylvia Palmer']")
      .click()

    cy.get('.button--confirm').click()
  });
});

describe("Editing", () => {
  it("should edit interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click()

    cy.get("[alt='Edit']").first()
      .click({ force: true })

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type('Lydia Miller-Jones')

    cy.get("[alt='Tori Malcolm']").click();

    cy.get('.button--confirm').click()
  });
});

describe("Canceling", () => {
  it("should cancel interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});