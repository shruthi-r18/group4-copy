import { test, expect } from '@playwright/test';
import {salesOrderPage} from '../pages/salesOrderPage';
import {createUserPage} from '../pages/createUserPage';
import {credentials} from '../testdata/salesOrderData';
import {URLs, expectedUrls } from '../testdata/createUserData';

test.describe('Sales Order Workflow', () => {
  test.beforeEach(async ({ page }) => {
    const CreateUserPage = new createUserPage(page);
    await CreateUserPage.goto(URLs.baseURL);
    await CreateUserPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(expectedUrls.loginSuccess);
  });

  test('Create Sales Order With Valid Data', async ({ page }) => {
    const SalesOrderPage = new salesOrderPage(page);

    await SalesOrderPage.navigateToSalesOrderPage();
    await SalesOrderPage.enterSubject('Q3-2025 Order for ABC Corp');
    await SalesOrderPage.selectValidTillDate('2025-09-30');
    await SalesOrderPage.enterStatus('Confirmed');

    // await SalesOrderPage.submitForm();
    // await expect(page.locator('text=Sales Order created successfully')).toBeVisible();
  });
});

 