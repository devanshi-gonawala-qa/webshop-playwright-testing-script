import {test as base} from '@playwright/test';
import{LoginPage} from '../pages/LoginPage'
import { RegistrationPage } from '../pages/RegistrationPage';
import { registerHooks } from '../utils/Hooks';

type Myfixtures = {
    loginPage: LoginPage;
    registrationpage: RegistrationPage;
}
export const test = base.extend<Myfixtures>({
//Define your fixtures here
// Login page fixture
    loginPage : async({page}, use) => {
        const loginPage = new LoginPage(page);
        //setup() before use 
        // await page.goto("/"); //because we make a hooks before each and open the url from beforeeach
        await use(loginPage);
        //teardown()
    },
     registrationpage:async({page},use) => {
        const registrationpage = new RegistrationPage(page);
        // await page.goto("/");
        await use(registrationpage);
     }
});
registerHooks();
export {expect} from '@playwright/test';