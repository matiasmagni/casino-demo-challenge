/// <reference types="cypress-tags" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import SignInPage from '../components/pages/SignInPage';
import UserInfoHeaderComponent from '../components/UserInfoHeaderComponent';
import { USD_REGEX } from '../../utils/regex';

When('the user clicks on password eye button', ()=> {
    const page: SignInPage = new SignInPage();
    page.getElement('passwordToggler').click({ force: true });
});

Then('the user cannot visualize the obfuscated password', (password: string) => {
    const page: SignInPage = new SignInPage();
    page.getElement('passwordInput').should('have.attr', 'type', 'password');
});

Then('the user can visualize the non obfuscated password', (password: string) => {
    const page: SignInPage = new SignInPage();
    page.getElement('passwordInput').should('have.attr', 'type', 'text');
});

Then('the user visualizes the user info header correctly', () => {
    const page: UserInfoHeaderComponent = new UserInfoHeaderComponent();
    // Check visibility of all defined elements in fixtures files
    page.getAllSelectors().forEach((elementName: string) => {
        page.getElement(elementName)
            .should('exist')
            .and('be.visible');
    });
    // Check visibility of Real currency label
    page.getElement('wrapper').contains('Real')
        .should('exist')
        .and('be.visible');
    // Check visibility of Bonus currency label
    page.getElement('wrapper').contains('Bonus')
        .should('exist')
        .and('be.visible');
    // Check visibility of Real currency value
    page.getElement('currencyRealWrapper')
        .contains(USD_REGEX)
        .should('exist')
        .and('be.visible');
    // Check visibility of Bonus currency value
    page.getElement('currencyBonusWrapper')
        .contains(USD_REGEX)
        .should('exist')
        .and('be.visible');
});


