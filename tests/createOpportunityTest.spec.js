const { test, expect } = require('@playwright/test');
const { OpportunityPage } = require('../pages/OpportunityPage');

const testData = require('../testdata/OpportunityData.js');

test('Create Opportunity on CRM', async ({ page }) => {
  const opportunity = new OpportunityPage(page);

  // Visit login page
  await page.goto('http://49.249.28.218:8098/');

  // Login
 const url = await opportunity.login(testData.username, testData.password);
  await page.waitForLoadState('networkidle');
//dashboard
  await expect(url).toMatch("http://49.249.28.218:8098/dashboard"); // Adjust to expected post-login URL

  // Navigate to Create Opportunity
  await opportunity.goToCreateOpportunity();

  // Fill out the form
  await opportunity.fillOpportunityForm(testData);

  // Submit button (optional - add the XPath if it's known)
  // await page.click("//button[text()='Save']");

  // Validate success (optional - depends on app's behavior)
  // await expect(page.locator("text=Opportunity created successfully")).toBeVisible();
});
