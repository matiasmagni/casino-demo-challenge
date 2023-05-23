import BasePage from './BasePage';

export enum Medium {
    'E-mail',
    'Phone'
};

export default class SignUpPage extends BasePage {
    protected url: string = '/user/registration';

    /**
     * Switches the current sign up medium to the one passed by argument.
     * 
     * @param medium The medium you want to switch to (i.e. E-mail or Phone).
     */
    public switchSignUpWayTo(medium: Medium) {
        cy.get(this.selectors['signUpMedium']).contains(medium).click();
    }
}
