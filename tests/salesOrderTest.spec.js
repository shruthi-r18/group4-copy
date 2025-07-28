import { test, expect } from '@playwright/test';
import {salesOrderPage} from '../pages/salesOrderPage';
import {usercredential,data} from '../testdata/salesOrderData';
import {CreateUserPage } from '../pages/loginPage';
import {URLs, expectedUrls } from '../testdata/loginData';

test.describe('Sales Order Workflow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new CreateUserPage (page);
    await loginPage.goto(URLs.baseURL);
    //await page.setViewportSize({ width: 1920, height: 1080 });
    await loginPage.login(usercredential.username, usercredential.password);
    await expect(page).toHaveURL(expectedUrls.loginSuccess);
  });

  test('Create Sales Order With Valid Data', async ({ page }) => {
    const salesOrder = new salesOrderPage(page);
    await salesOrder.navigateToSalesOrderPage();    
    await salesOrder.enterSubject(data.subject);
    await salesOrder.selectValidTillDate(data.validTillDate);
    await salesOrder.enterStatus(data.status);    
    //Select required opportunity     
    await salesOrder.selectOpportunity(data.opportunity);
    //Select required Quote
    await salesOrder.selectQuote(data.quote);
    //Select required Contact
    await salesOrder.selectContact(data.contactName);
    await salesOrder.enterBillingAddress(data.billingAddress);
    await page.waitForTimeout(5000); 
});    
    // await SalesOrderPage.submitForm();
    // await expect(page.locator('text=Sales Order created successfully')).toBeVisible();
  });

