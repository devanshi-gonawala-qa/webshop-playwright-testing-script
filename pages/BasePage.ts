import { Locator,Page } from "@playwright/test";

class BasePage{
    page:Page;

    constructor(page: Page) { //orange page is parameter and white is this's page
        this.page = page
    }
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    // Click element
    async clickElement(locator: Locator) {
        await locator.click();
        }

    // Enter text
    async enterText(locator: Locator, text: string) {
        await locator.fill(text);
    }

    // Get text
    async getText(locator: Locator) {
        return await locator.innerText();
    }

    // Verify element visibility
    async verifyVisibility(locator: Locator) {
        return await locator.isVisible();
    }

    // Hover over element
    async hoverElement(locator: Locator) {
        await locator.hover();
    }

    // Select dropdown
    async selectDropdown(locator: Locator, value: string) {
        await locator.selectOption(value);
    }

    // Take screenshot
    async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`
        });
    }  
}
export {BasePage};