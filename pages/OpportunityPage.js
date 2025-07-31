const { url } = require('inspector');

exports.OpportunityPage = class OpportunityPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Login
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#inputPassword');
    this.signInButton = page.locator("//button[@class='btn btn-primary btn-lg btn-block']");


    // Navigation
    this.opportunityTab = page.locator("//a[text()='Opportunities']");
    this.createOpportunityButton = page.locator("//span[text()='Create Opportunity']");

    // Form fields
    this.opportunityName = page.locator("//input[@type='text' and @name='opportunityName']");
    this.amount = page.locator("//input[@type='number' and @name='amount']");
    this.businessType = page.locator("//input[@type='text' and @name='businessType']");
    this.assignedTo = page.locator("//input[@type='text' and @name='assignedTo']");
    this.expectedCloseDate = page.locator("//input[@type='date' and @name='expectedCloseDate']");
    this.nextStep = page.locator("//input[@type='text' and @name='nextStep']");
    this.salesStage = page.locator("//input[@type='text' and @name='salesStage']");
    this.probability = page.locator("//input[@type='number' and @name='probability']");
    this.lead = page.locator("//input[@type='text' and @readonly and @required]");
    this.description = page.locator("//textarea[@name='description']");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    return this.page.url();
  }

  async goToCreateOpportunity() {
    await this.page.waitForSelector("//a[text()='Opportunities']", { state: 'visible', timeout: 10000 });
    await this.page.click("//a[text()='Opportunities']");
    
  }
  


  async fillOpportunityForm(data) {
    await this.opportunityName.fill(data.opportunityName);
    await this.amount.fill(data.amount);
    await this.businessType.fill(data.businessType);
    await this.assignedTo.fill(data.assignedTo);
    await this.expectedCloseDate.fill(data.expectedCloseDate);
    await this.nextStep.fill(data.nextStep);
    await this.salesStage.fill(data.salesStage);
    await this.probability.fill(data.probability);
  
    await this.description.fill(data.description);
  }
};
