import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

class LoginPage extends BasePage {
    private readonly loginLink: Locator;
    private readonly emailInput:Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;
    private readonly logoutButton:Locator;
    private readonly errorMessage: Locator;
    

    constructor(page:Page){
        super(page);
        this.loginLink = page.getByText("Log in");
        this.emailInput = page.getByLabel("Email");
        this.passwordInput = page.getByLabel("Password");
        this.loginButton = page.getByRole("button", {name : 'Log in'});
        this.logoutButton = page.getByText("Log out");
        this.errorMessage=page.locator('[class="validation-summary-errors"]');
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
async verifyLoginOutcome(expectedResult: string) {
        if (expectedResult.toLowerCase() === "success") {
            await expect(this.logoutButton).toBeVisible();
            return;
        }

        // Expected error messages are pipe-separated in the workbook and asserted individually.
        const expectedMessages = expectedResult.split("|").filter(message => message.trim() !== "");
        if (expectedMessages.length === 0) {
            throw new Error("Login scenario must define an expected result.");
        }

        for (const message of expectedMessages) {
            await expect(this.errorMessage).toContainText(message);
        }
    }
}
export { LoginPage };   
