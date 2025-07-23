import { test ,expect} from '@playwright/test';
import { campaignPage } from '../pages/campaignPage.js';
import { testData } from '../testdata/campaignData.js';


test('create campaign with all fields',async ({page})=>{

    const CampaignPage= new campaignPage(page);

    await CampaignPage.goto(testData.URLs.url);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await CampaignPage.login(testData.login.username,testData.login.password);

    await expect(page).toHaveURL(testData.URLs.successLoginUrl);

    await CampaignPage.clickCampaignsTab();
    await CampaignPage.clickCreateCampaign();
    await CampaignPage.createCampaignWithAllFields(testData.campaign);
    await CampaignPage.clickCreateCampaignButton();
    
    await expect(page).toHaveURL(testData.URLs.successCampaignCreationURL);

    
}









);