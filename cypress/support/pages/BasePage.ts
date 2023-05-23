import { camelize } from "../../utils/string";

/**
 * BasePage class. All page objects must inherite from this class.
 */
export default abstract class BasePage {

    protected url: string = '/';
    protected selectors: any = null;
    protected data: any = null;

    constructor() {
        try {
            this.selectors = require(`../../fixtures/selectors/${this.constructor.name}.json`);
            this.data = require(`../../fixtures/data/${this.constructor.name}.json`);
        } catch (error) {
            cy.log(`Page Object "${this.constructor.name}"`, error);
        }
    }

    /**
     * Finds a button element by the given name (inner text).
     * 
     * @param name The button's name.
     * @returns A button element.
     */
    public static getButtonByName(name: string): Cypress.Chainable {
        return cy.contains('button', name);
    }

    /**
     * Finds a button element with a span inside by the given name (inner text).
     * 
     * @param name The button's name.
     * @returns A button element.
     */
    public static getSpanButtonByName(name: string): Cypress.Chainable {
        return cy.contains('button span', name);
    }

    /**
     * Returns the page's URL.
     * 
     * @returns The page's URL.
     */
    public getUrl(): string {
        return this.url;
    }

    /**
     * Returns all page's selectors.
     * 
     * @returns All page's selectors.
     */
    public getAllSelectors(): string[] {
        return Object.keys(this.selectors);
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
     * Gets a page element identified by the given name.
     * 
     * @param name the name of the page's element. 
     * @returns The page's element.
     */
    public getElement(name: string): Cypress.Chainable {
        let element: Cypress.Chainable;
        const selector = this.selectors[camelize(name)];
        
        return cy.get(selector);
    }

    /**
     * Searches a page element by a param key and identified by the given name.
     * 
     * @param name the name of the page's element.
     * @param searchParam the param that describes the search key for the element. 
     * @returns The page's element.
     */
    public getElementBySearchParam(name: string, searchParam: string): Cypress.Chainable | null {
        let element: Cypress.Chainable | null = null;
        const selector = this.selectors[camelize(name)].replace('{name}', searchParam);

        if (Cypress.$(selector).length > 0) {
            element = cy.get(selector);
        }

        return element;
    }

    /**
     * Gets the testing data identified by the field name.
     * 
     * @param fieldName The field's name where the data will be inputted.
     * @returns The requested testing data.
     */
    public getTestData(fieldName: string): number | string | any {
        return this.data[camelize(fieldName)];
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
