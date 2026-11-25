// import {test, expect} from '@playwright/test';//before fixture this is come from playwright
import {test, expect} from '../Fixtures/fixture'; 
import { ExcelReader } from '../utils/ExcelReader';
import { FrameworkConstants } from '../constansts/Constants';
// import { LoginPage } from '../pages/LoginPage';
//hard coded the test data for now but later we will pass it from constants file
// const data = ExcelReader.readExcelFile('./test-data/LoginTestData.xlsx', 'LoginData');
//now we will pass the test data file path and sheet name from the constants file
const data = ExcelReader.readExcelFile(`${FrameworkConstants.TESTDATA_Folder}/${FrameworkConstants.Excel_files.LoginTestData}`, `${FrameworkConstants.Sheet_names.LoginSheet}`);
data.shift();
/*test("Verify login functionality" , async({loginPage}) => {
    
//no need to create object of the page class as we have already created it in the fixture file and passed it to the test function as a parameter
    // const loginpage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.enterLoginCredentials("111Test@test.com", "111Test@test");
    await loginPage.verifyLogoutButtonIsVisible();
});*/
  test.describe('Login Functionality', () => {
        data.forEach(([name, email, password], index) => {
            test(`Verify Login Functionality ${index + 1} - ${name}`, async ({ loginPage }) => {
                await loginPage.navigateToLoginPage();
                await loginPage.enterLoginCredentials(String(email ?? ''), String(password ?? ''));
                switch (String(name ?? '').toLowerCase()) {
                case "valid standard user":
                await loginPage.verifyLoginOutcome("valid standard user")
                break;
                case "wrong username":
                await loginPage.verifyLoginOutcome("wrong username")
                break;

                case "empty username":
                await loginPage.verifyLoginOutcome("empty username")
                break;

                case "empty password":
                    await loginPage.verifyLoginOutcome("empty password")
                    break;
            }
            });
        });
    });