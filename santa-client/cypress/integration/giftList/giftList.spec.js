context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/gift-list");
  });

  it("Page is there", () => {
    cy.get(".giftListHeader").should("have.text", "Gift List");
  });

  it("add list, adds list", () => {
    cy.get(".addPerson").click();

    cy.get(".styledBox").should("have.length", 1);
  });

  it("add list, adds multiple lists", () => {
    cy.get(".addPerson").click().click().click();

    cy.get(".styledBox").should("have.length", 3);
  });

  it("delete one gift list works", () => {
    cy.get(".addPerson").click();

    cy.get(".deleteList").click();

    cy.get(".styledBox").should("have.length", 0);
  });

  it("delete many gift list works", () => {
    cy.get(".addPerson").click().click().click();

    cy.get(".deleteList").eq(1).click();

    cy.get(".deleteList").eq(0).click();

    cy.get(".styledBox").should("have.length", 1);
  });

  it("tests if add gift on list works", () => {
    cy.get(".addPerson").click();

    cy.get(".nameInput").type("name");

    cy.get(".giftInput").type("gift");

    cy.get(".giftSubmit").click();

    cy.get(".gift").should("have.length", 1);
  });

  it("tests if delete a specific gift works", () => {
    cy.get(".addPerson").click();

    cy.get(".nameInput").type("name");

    cy.get(".giftInput").type("gift");

    cy.get(".giftSubmit").click().click();

    cy.get(".deleteGift").eq(0).click();

    cy.get(".gift").should("have.length", 1);
  });
});
