import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import { credentials, URLs, expectedUrls } from '../testdata/createUserData';
import { createLeadPage } from '../pages/createLeadPage';
import { leadData } from '../testdata/leadData';

test('create Lead with Details',async ({ page }) => {


const LoginPage = new loginPage(page);

const actualUrl = await LoginPage.goto(URLs.baseURL);
page.setDefaultTimeout(80000);

expect(actualUrl).toMatch(expectedUrls.loginSuccess);

// Perform login with each test data
const errorMsg = await LoginPage.login("rmgyantra", "rmgy@9999");

//await CreateLeadPage.createLeadwithDetails(leadData.leadCreationdata);
// Add assertions to verify lead creation success   
// const successMessage = await page.locator('.success-message'); // Adjust the selector based on your application
}
);


