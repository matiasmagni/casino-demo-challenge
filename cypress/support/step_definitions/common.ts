/// <reference types="cypress-tags" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import BasePage from '../pages/BasePage';
import PageFactory from '../pages/PageFactory';
import { getRandomEmail } from '../../utils/random';
import { faker } from '@faker-js/faker';
import SignUpPage from '../pages/SignUpPage';

Given('the user has navigated to {string} page', (pageName: string) => {
    PageFactory.getCurrentPageObject(pageName).navigateToThisPage(30);
});

When('the user has closed the Welcome window', () => {
    BasePage.getButtonByName('×').click();
});

When('the user clicks on {string} button', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).click();
});

When('the user clicks on {string} form button', (buttonName: string) => {
    BasePage.getSpanButtonByName(buttonName).click();
});

When('the user inputs valid data into {string} form', (pageName: string, table: any) => {
    const data: string[][] = table.rows();
    const page: BasePage = PageFactory.getCurrentPageObject(pageName);

    data.forEach(([fieldName, fieldType, fieldValue]: string[]) => {
        switch (fieldType) {
            case 'Input':
                page.getElement(fieldName + 'Input')
                    .type(fieldValue);
                break;

            case 'Checkbox':
                switch (fieldValue) {
                    case 'Yes':
                        page.getElement(fieldName + 'Checkbox')
                            .check({ force: true }); // Workaround for covered element
                        break;

                    case 'No':
                        break;

                    default:
                        throw new Error('Allowed values are "Yes" or "No" only!');
                }

                break;

            case 'Dropdown':
                // Complex dropdown (non HTML select)
                // Click on dropdown to display items
                page.getElement(fieldName + 'Dropdown')
                    .click();
                // Get the displayed choosen item and click it
                page.getElement(fieldName + 'DropdownItem')
                    .contains(fieldValue)
                    .click();

                break;

            case 'Random Email Input':
                page.getElement(fieldName + 'Input')
                    .type(getRandomEmail(fieldValue, 'gmail.com'));
                break;

            case 'Phone Input':
                page.getElement(fieldName + 'Input').clear().type(faker.phone.number(fieldValue));
                break;

            default:
                throw new Error(`Field type "${fieldType}" not implemented yet`)
        }
    });
});

When('the user completes the captcha manually', () => {
    // Pauses the tests.
    cy.pause();
    // Complete the captcha manually and then continue the test.
});

Then('the user visualizes {string} page correctly', (pageName: string) => {
    let expectedTexts: any = {};

    switch (pageName) {
        case 'Registration Success':
            expectedTexts = {
                title: ' Congratulations! ',
                descriptionText: ' Registration successfully finished! Confirmation has been sent to you. ',
                viewProfileButton: 'View profile',
                browseGamesButton: 'Browse games',
            }
            break;

        case 'Confirm Phone':
            expectedTexts = {
                title: 'You must confirm your phone number',
                descriptionText: 'Confirmation has been sent to your phone. It is necessary to confirm the SMS in order to complete the registration process.',
                verificationCodeLabel: 'Verification code',
                verifyButton: ' Verify',
                requestCodeButton: ' Request code',
            }
            break;

        default:
            throw new Error(`"${pageName}" page not implemented yet!`);

    }

    const page: BasePage = PageFactory.getCurrentPageObject(pageName);
    // Checks existence and visibility for all elements of the page
    page.getAllSelectors().forEach((elementName: string) => {
        page.getElement(elementName).should('exist').and('be.visible');
    });
    // Verify elements have the expected text
    Object.entries(expectedTexts).forEach(([elementName, expectedText]) => {
        page.getElement(elementName).should('have.text', expectedText);
    });
});

Then('the user is redirected to {string} page', (pageName: string) => {
    const regex = new RegExp(`${PageFactory.getCurrentPageObject(pageName).getUrl()}$`);
    cy.url().should('match', regex);
});

Then('the user receives the SMS messsage in his phone and inputs the verification code manually', () => {
    // Pauses the tests.
    cy.pause();
    // Check.
});

Then('the user visualizes error messages below the {string} uncompleted fields', (pageName: string, table: any) => {
    const page: BasePage = PageFactory.getCurrentPageObject(pageName);

    table.rows().forEach(([fieldName]: string[]) => {
        page.getElement(fieldName + 'BlankErrorMsg')
            .should('exist')
            .and('be.visible')
            .and('contain.text', page.getTestData(fieldName + 'BlankError'));
    });
});