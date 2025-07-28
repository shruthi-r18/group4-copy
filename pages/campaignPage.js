 export class campaignPage{

    constructor(page) {
      this.page = page;
      this.username = '#username';
      this.password = '#inputPassword';
      this.loginButton = 'button[type="submit"]';
      this.campaignTab = 'a[href="/campaigns"]';
      this.createCampaign='button[class="btn btn-info"]';
      this.campaignNameField='[name="campaignName"]';
      this.campaignStatusField='[name="campaignStatus"]';
      this.targetSizeField='[name="targetSize"]';
      this.expectedCloseDateField='[name="expectedCloseDate"]';
      this.targetAudienceField='[name="targetAudience"]';
      this.descriptionField='textarea[name="description"]';
      this.createCampaignButton='button[type="submit"]';
      this.editCampaignButton='(//a[@class="edit"]/i)[1]';
      this.updateCampaignButton='//button[text()="Update Campaign"]';


    }
  
async goto(url) {
      await this.page.goto(url);
      await this.page.waitForLoadState('networkidle');
      return await this.page.url();
    }
async login(username, password) {
      
    await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginButton);

}
async clickCampaignsTab(){

    await this.page.click(this.campaignTab);
}
async clickCreateCampaign(){

    await this.page.click(this.createCampaign)
}
async createCampaignWithFields(data){

    await this.page.fill(this.campaignNameField,data.name);
    await this.page.fill(this.campaignStatusField,data.status);
    await this.page.fill(this.targetSizeField,data.targetSize);
    await this.page.fill(this.expectedCloseDateField,data.expectedCloseDate);
    await this.page.fill(this.targetAudienceField,data.targetAudience);
    await this.page.fill(this.descriptionField,data.description);

}
async createCampaignWithMandatoryFields(data){

    await this.page.fill(this.campaignNameField,data.name);
    await this.page.fill(this.targetSizeField,data.targetSize);
    
}
async clickCreateCampaignButton(){

    await this.page.click(this.createCampaignButton);
    await this.page.waitForTimeout(2000); 
}
async getFieldValidationMessage(fieldName) {

    return await this.page.evaluate((name) => {
        return document.querySelector(`[name="${name}"]`).validationMessage;
    }, fieldName);
}
async setExpectedCloseDateRaw(value) {
    await this.page.evaluate(({ selector, val }) => {
        document.querySelector(selector).value = val;
    }, { selector: this.expectedCloseDateField, val: value });
    await this.page.waitForTimeout(2000); 
}
async clickEditCampaignButton() {
    
    await this.page.locator(this.editCampaignButton).click();
}
async editCampaignFields(data) {

    if (data.updatedStatus) {
        await this.page.fill(this.campaignStatusField, data.updatedStatus);
    }
    await this.page.waitForTimeout(2000);
     
 
}
async clickUpdateCampaignButton() {

    await this.page.locator(this.updateCampaignButton).click();
    await this.page.waitForTimeout(2000);
}




}

//module.exports = { campaignPage };