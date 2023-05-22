/// <reference types="cypress-tags" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import BasePage from '../pages/BasePage';
import PageFactory from '../pages/PageFactory';
import { getRandomEmail } from '../../utils/random';

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
                page.getElement(fieldName + 'Dropdown')
                    .click();

                page.getElement(fieldName + 'DropdownItem')
                    .contains(fieldValue)
                    .click();

                break;

            case 'Random Email Input':
                page.getElement(fieldName + 'Input')
                    .type(getRandomEmail(fieldValue, 'gmail.com'));
                break;

            default:
                throw new Error(`Field type "${fieldType}" not implemented yet`)
        }
    });
});

When('the user selects {string} option on Redeem Bonus section of {string} page',
    (option: string, pageName: string) => {
        const page: BasePage = PageFactory.getCurrentPageObject(pageName);

        switch (option) {
            case 'Use a promo code':
                page.getElement('promoCodeRadio')
                    .click({ force: true }); // Workaround for covered element
                break;

            case 'No bonus':
                page.getElement('noBonusRadio')
                    .click({ force: true }); // Workaround for covered element
                break;

            default:
                throw new Error(`Redeem bonus option "${option}" not implemented yet!`);

        }
    }
);

When('the user completes the captcha manually', () => {
    // Pauses the tests.
    cy.pause();
    // Complete the captcha manually and then continue the test.
});

Then('the user visualizes {string} page correctly', (pageName: string) => {
    const page: BasePage = PageFactory.getCurrentPageObject(pageName);

    switch (pageName) {
        case 'Registration Success':
            page.getAllSelectors().forEach((elementName: string) => {
                page.getElement(elementName).should('exist').and('be.visible');
            });

            break;

        default:
            throw new Error(`"${pageName}" page not implemented yet!`);

    }
});

Then('the user is redirected to {string} page', (pageName: string) => {
    const regex = new RegExp(`${PageFactory.getCurrentPageObject(pageName).getUrl()}$`);
    cy.url().should('match', regex);
});
