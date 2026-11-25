import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";

class LoginPage extends BasePage {
    private readonly loginLink: Locator;
    private readonly emailInput:Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;
    private readonly logoutButton:Locator;
    private readonly errorMessage: Locator;
    private readonly errorMessageInValidUsername: Locator;
    

    constructor(page:Page){
        super(page);
        this.loginLink = page.getByText("Log in");
        this.emailInput = page.getByLabel("Email");
        this.passwordInput = page.getByLabel("Password");
        this.loginButton = page.getByRole("button", {name : 'Log in'});
        this.logoutButton = page.getByText("Log out");
        this.errorMessage=page.locator('[class="validation-summary-errors"]');
        this.errorMessageInValidUsername=page.locator('[class="field-validation-error"]');
    }
async navigateToLoginPage(){
    await this.loginLink.click();
}
async enterLoginCredentials(email:string,password:string){
    /*await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();*/
    await this.enterText(this.emailInput, email);
    await this.enterText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
}
async verifyLoginOutcome(errorMessage: string) {
        switch (errorMessage.toLowerCase()) {
            case "valid standard user":
                // Expected: Success
                await expect(this.logoutButton).toBeVisible();
                break;
            case "wrong username":
                await expect(this.errorMessageInValidUsername).toContainText(
                "Please enter a valid email address.");
                break;
            case "empty username":
                  await expect(this.errorMessage).toContainText("Login was unsuccessful. Please correct the errors and try again.");
                  await expect(this.errorMessage).toContainText("No customer account found");
                break;
            case "empty password":
                await expect(this.errorMessage).toContainText("Login was unsuccessful. Please correct the errors and try again.");
                await expect(this.errorMessage).toContainText("The credentials provided are incorrect");
                break;
            default:
                throw new Error(`Unknown login scenario: ${errorMessage}`);
        }
    }
}
export { LoginPage };   
