import BasePage from "./BasePage";
import ConfirmPhonePage from "./ConfirmPhonePage";
import DashboardPage from "./DashboardPage";
import RegistrationSuccessPage from "./RegistrationSuccessPage";
import SignInPage from "./SignInPage";
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

            case 'Confirm Phone':
                page = new ConfirmPhonePage();
                break;

            case 'Sign In':
                page = new SignInPage();
                break;

            case 'Dashboard':
                page = new DashboardPage();
                break;

            default:
                throw new Error(`"${pageName}" page not implemented yet!`);
        }

        return page;
    };
}
