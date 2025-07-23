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
    await CampaignPage.createCampaignWithFields(testData.campaigns[0]);
    await CampaignPage.clickCreateCampaignButton();
    await expect(page).toHaveURL(testData.URLs.successCampaignCreationURL);

     });

     test('create campaign with Mandatory fields',async ({page})=>{

    const CampaignPage= new campaignPage(page);

    await CampaignPage.goto(testData.URLs.url);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await CampaignPage.login(testData.login.username,testData.login.password);
    await expect(page).toHaveURL(testData.URLs.successLoginUrl);
    await CampaignPage.clickCampaignsTab();
    await CampaignPage.clickCreateCampaign();
    await CampaignPage.createCampaignWithMandatoryFields(testData.campaigns[1]);
    await CampaignPage.clickCreateCampaignButton();
    await expect(page).toHaveURL(testData.URLs.successCampaignCreationURL);

     });
     test('create campaign with Empty Campaign Name fields',async ({page})=>{

    const CampaignPage= new campaignPage(page);

    await CampaignPage.goto(testData.URLs.url);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await CampaignPage.login(testData.login.username,testData.login.password);
    await expect(page).toHaveURL(testData.URLs.successLoginUrl);
    await CampaignPage.clickCampaignsTab();
    await CampaignPage.clickCreateCampaign();
    await CampaignPage.createCampaignWithFields(testData.campaigns[2]);
    await CampaignPage.clickCreateCampaignButton();
    const campaignNameValidation = await CampaignPage.getFieldValidationMessage(testData.campaigns[2].expectedValidationField);
    expect(campaignNameValidation).toContain(testData.campaigns[2].expectedValidationMessage);

     });

     test('create campaign with Empty Target Size fields',async ({page})=>{

    const CampaignPage= new campaignPage(page);

    await CampaignPage.goto(testData.URLs.url);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await CampaignPage.login(testData.login.username,testData.login.password);
    await expect(page).toHaveURL(testData.URLs.successLoginUrl);
    await CampaignPage.clickCampaignsTab();
    await CampaignPage.clickCreateCampaign();
    await CampaignPage.createCampaignWithFields(testData.campaigns[3]);
    await CampaignPage.clickCreateCampaignButton();
    const campaignNameValidation = await CampaignPage.getFieldValidationMessage(testData.campaigns[3].expectedValidationField);
    expect(campaignNameValidation).toContain(testData.campaigns[3].expectedValidationMessage);

     });











