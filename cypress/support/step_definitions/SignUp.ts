/// <reference types="cypress-tags" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import SignUpPage, { Medium } from '../components/pages/SignUpPage';
import { BORDER_COLOR } from '../../utils/constants';

When(/^the user selects "(Use a promo code|No bonus)" option on Redeem Bonus section$/, (option: string) => {
    const page: SignUpPage = new SignUpPage();

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

When('the user inputs the promo code: {string}', (promoCode: string) => {
    const page: SignUpPage = new SignUpPage();
    page.getElement('promoCodeInput').type(promoCode);
});

Then('the user cannot visualize the Reedeem Bonus section', () => {
    const page: SignUpPage = new SignUpPage();
    page.getElement('redeemBonusSection')
        .should('exist')
        .and('not.be.visible');
});

When(/^the user switches to "(E-mail|Phone)" medium$/, (medium: Medium) => {
    const page: SignUpPage = new SignUpPage();
    page.switchSignUpWayTo(medium);
});

Then('the user visualizes email field border color is transparent', ()=> {
    const page: SignUpPage = new SignUpPage();
    page.getElement('emailInput')
        .should('have.css', 'border-color', BORDER_COLOR.TRANSPARENT);
});

Then('the user visualizes an error message below email field which border turned red', () => {
    const page: SignUpPage = new SignUpPage();
    // Verify already existing email error message appears
    page.getElement('emailErrorMsg')
        .should('contain.text', page.getTestData('existingEmailError'))
    // Verify email input border turned red
    page.getElement('emailInput')
        .should('have.css', 'border-color', BORDER_COLOR.RED);
});
