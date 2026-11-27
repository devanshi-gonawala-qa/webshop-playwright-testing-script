import {test} from '../Fixtures/fixture';
import { ExcelReader } from '../utils/ExcelReader';
import { FrameworkConstants } from '../constansts/Constants';

// Skip the worksheet header; each remaining row defines one login test.
const loginData = ExcelReader.readExcelFile(
    `${FrameworkConstants.TESTDATA_Folder}/${FrameworkConstants.Excel_files.TestData}`,
    FrameworkConstants.Sheet_names.LoginSheet
);
const scenarios = loginData.slice(1).filter(row =>
    row.some(value => value !== undefined && value !== null && String(value).trim() !== '')
);

test.describe('Login Functionality', () => {
    scenarios.forEach((row, index) => {
        // LoginData columns: scenario, email, password, expected result.
        const [scenario, email, password, expectedResult] = row.map(value => String(value ?? ''));

        test(`Login ${index + 1} - ${scenario}`, async ({ loginPage }) => {
            await loginPage.navigateToLoginPage();
            await loginPage.enterLoginCredentials(email, password);
            await loginPage.verifyLoginOutcome(expectedResult);
        });
    });
});