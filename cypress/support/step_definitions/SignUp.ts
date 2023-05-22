/// <reference types="cypress-tags" />
import { When } from 'cypress-cucumber-preprocessor/steps';
import SignUpPage from '../pages/SignUpPage';

When('the user inputs the promo code: {string}', (promoCode: string) => {
    const page: SignUpPage = new SignUpPage();
    page.getElement('promoCodeInput').type(promoCode);
});
