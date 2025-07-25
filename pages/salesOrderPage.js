class salesOrderPage {
    constructor(page) {
      this.page = page;
      //this.salesOrderButton = 'a[href*="Sales Order"]';
      this.salesOrderButton = 'text=Sales Order';
      this.createOrderButton = 'text=Create Order';
      this.subject = 'input[name="subject"]';
      this.validTill = 'input[type="date"]';
      this.status = 'input[name="status"]';
      // this.opportunity= '(//button[@class="action-button"])[1]';
      
    }

    async navigateToSalesOrderPage() {
    await this.page.click(this.salesOrderButton);
    await this.page.click(this.createOrderButton);
    await this.page.waitForLoadState('networkidle'); // Optional: wait for page load
  }
    async enterSubject(text) {
    await this.page.fill(this.subject, text);
   }

   async selectValidTillDate(date) {
    await this.page.fill(this.validTill, date);
   }

  async enterStatus(statusText) {
    await this.page.fill(this.status, statusText);
  }

  async submitForm() {
    await this.page.click('button[type="submit"]'); // Adjust as needed
  }
    
  
    /* async goto(url) {
      await this.page.goto(url);
      await this.page.waitForLoadState('networkidle');
      return await this.page.url();
    }
  
    async login(username, password) {
      await this.page.fill(this.username, username);
      await this.page.fill(this.password, password);
      await this.page.click(this.loginButton);
  
      // 1️⃣ Check DOM-based error (for blank fields)
      try {
        const errorLocator = this.page.locator(this.domErrorMessage);
        if (await errorLocator.isVisible({ timeout: 2000 })) {
          const message = await errorLocator.textContent();
          return message.trim();
        }
      } catch (e) {
        console.log('No DOM error message found.');
      }
  
      // 2️⃣ Check HTML5 browser validation message (for invalid credentials)
      const usernameValidationMsg = await this.page.$eval(this.username, el => el.validationMessage);
      if (usernameValidationMsg) return usernameValidationMsg;
  
      const passwordValidationMsg = await this.page.$eval(this.password, el => el.validationMessage);
      if (passwordValidationMsg) return passwordValidationMsg;
  
      // 3️⃣ Assume login success if no error found
      return '';
    } */
  }
  
  module.exports = { salesOrderPage };
  