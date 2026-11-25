// import {test, expect} from '@playwright/test';
import {test, expect} from '../Fixtures/fixture'
import { RegistrationPage } from '../pages/RegistrationPage';
test("Verify registaration functionality" , async({registrationpage}) => {

    // const registrationpagee = new RegistrationPage(page);
    await registrationpage.navigattoRegisterlink();
    await registrationpage.checktheradiobutton();
    await registrationpage.eneterthedetails("Kunj7812", "Patel", "Kunj7812@gmail.com", "987654124", "987654124");
    await registrationpage.verifylogoutbuttonisvisible();
});