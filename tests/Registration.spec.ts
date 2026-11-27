import { test } from '../Fixtures/fixture';
import { FrameworkConstants } from '../constansts/Constants';
import { ExcelReader } from '../utils/ExcelReader';

// Skip the worksheet header; each remaining row defines one registration test.
const registrationData = ExcelReader.readExcelFile(
    `${FrameworkConstants.TESTDATA_Folder}/${FrameworkConstants.Excel_files.TestData}`,
    FrameworkConstants.Sheet_names.RegistrationSheet
);
const scenarios = registrationData.slice(1).filter(row =>
    row.some(value => value !== undefined && value !== null && String(value).trim() !== '')
);

test.describe('Registration Functionality', () => {
    scenarios.forEach((row, index) => {
        // RegistrationData columns: scenario, gender, names, credentials, expected result.
        const [scenario, gender, firstName, lastName, email, password, confirmPassword, expectedResult] =
            row.map(value => String(value ?? ''));

        test(`Registration ${index + 1} - ${scenario}`, async ({ registrationpage }) => {
            await registrationpage.navigattoRegisterlink();
            if (gender) {
                await registrationpage.selectGender(gender);
            }

            // Replace the workbook token so successful registrations remain repeatable.
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
