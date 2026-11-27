import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
class RegistrationPage extends BasePage {
    private readonly registerlink: Locator;
    private readonly radiobutton:Locator;
    private readonly firstnameInput:Locator;
    private readonly lastnameInput: Locator;
    private readonly emailInput:Locator;
    private readonly passwordInput:Locator;
    private readonly confirmpasswordInput:Locator;
    private readonly registerbutton :Locator;
    private readonly logoutbutton:Locator;
    private readonly validationMessages: Locator;
    private readonly registrationResult: Locator;

constructor(page:Page){
    super(page);
    this.registerlink = page.getByText("Register");
    this.radiobutton = page.getByRole("radio", {name: "Male",exact: true});
    this.firstnameInput = page.getByLabel("First name:");
    this.lastnameInput = page.getByLabel("Last name:");
    this.emailInput = page.getByLabel("Email:");
    this.passwordInput = page.getByLabel("Password:", {exact:true});
    this.confirmpasswordInput = page.getByLabel("Confirm password:", {exact:true});
    this.registerbutton = page.locator("#register-button");
    this.logoutbutton = page.getByText("Log out");
    this.validationMessages = page.locator(".field-validation-error");
    this.registrationResult = page.locator(".result");
}
async navigattoRegisterlink(){
    await this.registerlink.click();
}
async checktheradiobutton(){
    await this.radiobutton.check();
}
async eneterthedetails(FirstName:string, LastName:string, email:string, password:string, confirmpassword:string){
    /*await this.firstnameInput.fill(FirstName);
    await this.lastnameInput.fill(LastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmpasswordInput.fill(confirmpassword);
    await this.registerbutton.click();*/
    await this.enterText(this.firstnameInput,FirstName)
    await this.enterText(this.lastnameInput,LastName);
    await this.enterText(this.emailInput,email);
    await this.enterText(this.passwordInput,password);
    await this.enterText(this.confirmpasswordInput,confirmpassword);
    await this.clickElement(this.registerbutton);
    
}
async verifylogoutbuttonisvisible(){
    await expect(this.logoutbutton).toBeVisible();
}
async verifyRegistrationOutcome(expectedResult: string){
    if(expectedResult.toLowerCase() === "success"){
        await expect(this.registrationResult).toContainText("Your registration completed");
        await this.verifylogoutbuttonisvisible();
        return;
    }

    const expectedMessages = expectedResult.split("|");
    await expect(this.validationMessages).toContainText(expectedMessages);
}
}
export{RegistrationPage}