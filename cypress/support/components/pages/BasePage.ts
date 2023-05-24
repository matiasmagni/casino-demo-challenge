import BaseComponent from "../BaseComponent";

/**
 * BasePage class. All page objects must inherite from this class.
 */
export default abstract class BasePage extends BaseComponent {

    protected url: string = '/';

    /**
     * Returns the page's URL.
     * 
     * @returns The page's URL.
     */
    public getUrl(): string {
        return this.url;
    }

    /**
     * Navigates to this page object's URL.
     * 
     * @param timeout in seconds.
     */
    public navigateToThisPage(timeout: number = 10) {
        cy.log('URL', this.getUrl());
        cy.visit(this.getUrl(), {
            timeout: timeout * 1000,
            failOnStatusCode: false // Workaround for 503 status code error
        });
    }

    /**
     * Scrolls to the bottom of the page slowly.
     * For video recording debugging purposes.
     */
    protected scrollSlowlyToBottom() {
        cy.scrollTo('bottom', { duration: Cypress.env('timeouts').scroll });
    }

    /**
     * Scrolls to the top of the page slowly.
     * For video recording debugging purposes.
     */
    protected scrollSlowlyToTop() {
        cy.scrollTo('top', { duration: Cypress.env('timeouts').scroll });
    }
}
