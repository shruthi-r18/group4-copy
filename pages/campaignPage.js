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
      this .searchBox='//select[@class="form-control"]';
      this .searchInput='//input[@placeholder="Search by Campaign Name"]';
      this .campaignsTable='//table[@class="table table-striped table-hover"]';
      this.tableRows = page.locator('table.table tbody tr');



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
async getExpectedCloseDateValidationMessage(selector) {

    // Use the page's evaluate method to get the validation message
   return this.page.$eval(selector, el => el.validationMessage);
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
async searchCampaignByName(name) {

    await this.page.locator(this.searchBox).click();
    await this.page.selectOption('select', { label: 'Search by Campaign Name' });
    await this.page.locator(this.searchInput).fill(name);
    await this.page.waitForTimeout(2000); 
  }

  getCampaignRowByName(name) {
    return this.tableRows.filter({ hasText: name });
  }
  getCampaignNameCell(rowLocator) {
    return rowLocator.locator('td').nth(1);
  }

  async getCustomDropdownOptions() {
    await this.campaignStatusField.click(); 
    return await this.campaignStatusField.allTextContents();
  }

}









//module.exports = { campaignPage };