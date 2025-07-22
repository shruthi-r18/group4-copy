class createUserPage {
    constructor(page) {
      this.page = page;
      this.username = '#username';
      this.password = '#inputPassword';
      this.loginButton = 'button[type="submit"]';
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
    }
  }
  
  module.exports = { createUserPage };
  