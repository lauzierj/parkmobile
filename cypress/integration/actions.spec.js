/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('thing happened, ignoring');
  // https://docs.cypress.io/guides/references/error-messages.html#Cypress-detected-that-an-uncaught-error-was-thrown-from-a-cross-origin-script
  // Not sure what the error was. It wasn't showing up in the console and I couldn't get CORS set up appropriately for
  // Cypress to be able to surface it. Turned off failures due to uncaught exceptions instead... HAMMER TIME
  // https://docs.cypress.io/api/events/catalog-of-events.html#To-turn-off-all-uncaught-exception-handling
  return false;
});

context('ParkMobile', () => {
  beforeEach(() => {
    cy.visit('https://dlweb.parkmobile.us/Phonixx/personalpages/home/');
    cy.get('[name="ctl00$ContentPlaceHolder1$UcUserLoginControl1$userName"]').type(process.env.USERNAME);
    cy.get('[name="ctl00$ContentPlaceHolder1$UcUserLoginControl1$password"]').type(process.env.PASSWORD);
    cy.get('#ctl00_ContentPlaceHolder1_UcUserLoginControl1_lbLogon').click();
  });

  it('pays for parking', () => {
    cy.get('#ctl00_Ucmenupp2_lStartParkeren').click();
    cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_dgUsers_ctl02_tbZone').type(process.env.ZONE);
    cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_lnkStartParking').click();
    cy.get('[value="7176318"]').click();
    cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_lnkStartParking').click();

    if (process.env.PRODUCTION) {
      cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_UcPermitParkingCasualDuration_rbConsecutiveDuration_0').click();
      cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_UcPermitParkingCasualDuration_ddDays_Input').type(1);
    } else {
      cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_UcPermitParkingCasualDuration_rbConsecutiveDuration_1').click();
      cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_UcPermitParkingCasualDuration_ddMinutes_Input').type('12');
    }

    cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_lnkStartParking').click();
    cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_UcPermitParkingCasualDuration_cbConfirmPayment').click();
//    cy.get('#ctl00_cphMain_ucPermitParkingCasualStart1_lnkStartParking').click();
  });
});
