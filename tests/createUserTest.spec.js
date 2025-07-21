import { test, expect } from '@playwright/test';
import {createUserPage} from '../pages/createUserPage';
import {credentials, URLs, expectedUrls } from '../testdata/createUserData';

test.describe('NinjaHrm - Login validations', () => {
  for (const data of credentials) {
    test(`${data.testname}`, async ({ page }) => {
      const CreateUserPage = new createUserPage(page);
      const actualUrl = await CreateUserPage.goto(URLs.baseURL);
      expect(actualUrl).toMatch(expectedUrls.loginSuccess);
      
      // Perform login with each test data
      const errorMsg =await CreateUserPage.login(data.username, data.password);   
      // Check if the error message matches the expected error
      expect(errorMsg).toContain(data.error);
});
}
});
