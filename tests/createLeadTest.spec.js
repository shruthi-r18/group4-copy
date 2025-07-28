import { test, expect } from '@playwright/test';
import {createLeadPage} from '../pages/createLeadPage';
import {leadData} from '../testdata/leadData'


test('create Lead with Details',async ({ page }) => {

const CreateLeadPage= new createLeadPage(page);

    await CreateLeadPage.goto(leadData.URLs.url);
    //await page.setViewportSize({ width: 1850, height: 1080 });
    page.setDefaultTimeout(60000);
    await CreateLeadPage.login(leadData.login.username,leadData.login.password);
    await expect(page).toHaveURL(leadData.URLs.successLoginUrl);
   
    await CreateLeadPage.clickLeadsTab();
    await CreateLeadPage.clickCreateLead();

    await CreateLeadPage.createLeadwithDetails(leadData.leadCreationdata);
    await CreateLeadPage.clickCreateLeadButton();
        
    await expect(page).toHaveURL(leadData.URLs.successLeadCreationURL);
}
);