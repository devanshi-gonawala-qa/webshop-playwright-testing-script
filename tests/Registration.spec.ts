import { test } from '../Fixtures/fixture';
import { FrameworkConstants } from '../constansts/Constants';
import { ExcelReader } from '../utils/ExcelReader';

const registrationData = ExcelReader.readExcelFile(
    `${FrameworkConstants.TESTDATA_Folder}/${FrameworkConstants.Excel_files.RegistrationTestData}`,
    FrameworkConstants.Sheet_names.RegistrationSheet
);
const scenarios = registrationData.slice(1).filter(row =>
    row.some(value => value !== undefined && value !== null && String(value).trim() !== '')
);

test.describe('Registration Functionality', () => {
    scenarios.forEach((row, index) => {
        const [scenario, gender, firstName, lastName, email, password, confirmPassword, expectedResult] =
            row.map(value => String(value ?? ''));

        test(`Registration ${index + 1} - ${scenario}`, async ({ registrationpage }) => {
            await registrationpage.navigattoRegisterlink();
            if (gender.toLowerCase() === 'male') {
                await registrationpage.checktheradiobutton();
            }

            const uniqueEmail = email.replace('{timestamp}', `${Date.now()}-${index}`);
            await registrationpage.eneterthedetails(
                firstName,
                lastName,
                uniqueEmail,
                password,
                confirmPassword
            );
            await registrationpage.verifyRegistrationOutcome(expectedResult);
        });
    });
});
