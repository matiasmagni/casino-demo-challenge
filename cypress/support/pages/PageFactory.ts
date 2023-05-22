import BasePage from "./BasePage";
import RegistrationSuccessPage from "./RegistrationSuccessPage";
import SignUpPage from "./SignUpPage";

export default class PageFactory {
    /**
     * Gets the page's object for the given name.
     * 
     * @param pageName The page's name.
     * @returns A page object.
     */
     public static getCurrentPageObject(pageName: string): BasePage {
        let page: BasePage;
    
        switch (pageName) {
            case 'Sign Up':
                page = new SignUpPage();
                break;

            case 'Registration Success':
                page = new RegistrationSuccessPage();
                break;
            
            default:
                throw new Error(`"${pageName}" page not implemented yet!`);
        }
    
        return page;
    };
}
