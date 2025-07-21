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
      // await this.page.fill(this.username, username);
      // await this.page.fill(this.password, password);
      // await this.page.click(this.loginButton);
      // return await this.page.url();
      await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginButton);
     // Return the URL after login
     const message = await this.page.locator(this.errorMessageForBlankUsername).textContent();
    if (!message) { 
      throw new Error('Error message for blank username not found');
    }
    console.log('Error message for blank username:', message);

         return message ; // Return the error message if present
    }
  }
  
  module.exports = { createUserPage };
  