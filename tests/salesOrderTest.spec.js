import { test, expect } from '@playwright/test';
import {salesOrderPage} from '../pages/salesOrderPage';
import {usercredential,data} from '../testdata/salesOrderData';
import {LoginPage } from '../pages/loginPage';
import {URLs, expectedUrls } from '../testdata/loginData';

test.describe('Sales Order Workflow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage (page);
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
    //Enter billing details
    await salesOrder.enterBillingAddress(data.billingAddress);
    await salesOrder.enterBillingCity(data.billingCity);
    await salesOrder.enterBillingState(data.billingState);
    await salesOrder.enterBillingPOBox(data.billingPOBox);
    await salesOrder.enterBillingPostalCode(data.billingPostalCode);
    await salesOrder.enterBillingCountry(data.billingCountry);
    //Enter Shipping details
    await salesOrder.enterShippingAddress(data.shippingAddress);
    await salesOrder.enterShippingCity(data.shippingCity);
    await salesOrder.enterShippingState(data.shippingState);
    await salesOrder.enterShippingPOBox(data.shippingPOBox);
    await salesOrder.enterShippingPostalCode(data.shippingPostalCode);
    await salesOrder.enterShippingCountry(data.shippingCountry);
    //Add product button and select the required product from the list
    await salesOrder.selectProduct(data.product);
    //await page.waitForTimeout(5000); 
    await salesOrder.submitSalesOrder();  
    await page.waitForTimeout(5000);   
    await expect(page.locator('text=Sales-Order Order for ABC Corp Successfully Added')).toBeVisible();
});    
    // await SalesOrderPage.submitForm();
    
  });

  test.describe('Sales Order - Negative Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(URLs.baseURL);
    await loginPage.login(usercredential.username, usercredential.password);
    await expect(page).toHaveURL(expectedUrls.loginSuccess);
  });

  for (const testCase of negativeTestCases) {
    test(`should fail when ${testCase.name}`, async ({ page }) => {
      const salesOrder = new salesOrderPage(page);
      await salesOrder.navigateToSalesOrderPage();
/* 
      // Dynamically call the appropriate method to enter field value
      switch (testCase.field) {
        case 'subject':
          await salesOrder.enterSubject(testCase.value);
          break;
        case 'billingPostalCode':
          await salesOrder.enterBillingPostalCode(testCase.value);
          break;
        case 'quantity':
          await salesOrder.enterQuantity(testCase.value);
          break;
        case 'status':
          await salesOrder.enterStatus(testCase.value);
          break;
        case 'validTill':
          await salesOrder.selectValidTillDate(testCase.value);
          break;
        // Add more cases as needed
      } */

      await salesOrder.submitSalesOrder();

      // Assert the validation error message appears
      await expect(page.locator('.error')).toContainText(testCase.errorMessage);
    });
  }
});