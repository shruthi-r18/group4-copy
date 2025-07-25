class UserPage{
    constructor(page) {
        this.page = page;
      }
    
    //   username = '#username';
    //   password = '#inputPassword';
    //   loginButton = 'button[type="submit"]';
      adminConsoleButton = 'div.nav-link >> li:has-text("Admin Console")';
      dropdown = 'div.dropdown>div.dropdown-item';
      createUser = 'div:has-text("Create User")';
      viewUser = 'div:has-text("View User")';
    
      errorMessageForBlankUsername = '.invalid-feedback';
      errorMessageForBlankPassword = '.invalid-feedback';
    
      usersFullName = 'input[name="empName"]';
      usersMobileNo = 'input[name="mobileNo"]';
      usersEmail = 'input[name="email"]';
      usersUsername = 'input[name="username"]';
      usersPassword = 'input[name="password"]';
      dateOfBirth= 'input[name="dob"]';
      saveButton= 'button[type="submit"]';
      errorMessageForEmail = 'div.error-message';
      errorMessageForDOB = 'div.error-message';

      async clickAdminConsole() {
        if (await this.page.locator(this.adminConsoleButton).isVisible()) {
            console.log('Admin Console button is visible');
            await this.page.click(this.adminConsoleButton);
            await this.page.waitForLoadState('networkidle');
            console.log(this.page.url());
            return this.page.url();}
        else {
            console.log('Admin Console button is not visible ,user does not have access');

            return this.page.url();
        }
      } 

      async adminConsoleDropdown(){
        await this.page.click(this.adminConsoleButton);
        await this.page.waitForTimeout(2000);
        const dropdownItems = await this.page.locator(this.dropdown).allTextContents();
        // const texts = await items.allTextContents();
        

        // const list =  await this.page.click(this.dropdown).getTextContent();
        console.log('Dropdown text:', dropdownItems);
        const texts  = dropdownItems.join(', ');
        console.log('Dropdown text joined:', texts);
        return dropdownItems;
      }

      async clickDropdownItems(selectItem) {
       await this.page.locator(this.dropdown).filter({ hasText: selectItem }).click();
  
        await this.page.waitForLoadState('networkidle');
        console.log('Create User URL:', this.page.url());
        return this.page.url();
      }

      async validateFields(fieldName, fieldValue) {
        const selector = this[fieldName];  // dynamically access selector
        await this.page.locator(selector).fill(fieldValue);
        await this.page.locator(this.saveButton).click(); // trigger validation
        const message = await this.page.$eval(selector, el => el.validationMessage);
        console.log(`Validation message for ${fieldName}:`, message);
        return message;
      }

      async validateEmail(fieldValue) {
        await this.page.locator(this.usersEmail).fill(fieldValue);
        await this.page.locator(this.saveButton).click(); // trigger validation
        const message = await this.page.locator(this.errorMessageForEmail).allTextContents();
        if (message.length > 0) {
          console.log('Email validation message:', message[0]);
        return message[0];
        }else {
            const message = await this.page.$eval(this.usersEmail, el => el.validationMessage);
        console.log('Validation message for Email:', message);
        return message;
          
        }
        
      }
      async validateDOB(fieldValue) {
        await this.page.locator(this.dateOfBirth).fill(fieldValue);
        await this.page.locator(this.saveButton).click(); // trigger validation
        const message = await this.page.locator(this.errorMessageForDOB).allTextContents();
        if (message.length > 0) {
          console.log('DOB validation message:', message[0]);
          return message[0];
        } else {
            const message = await this.page.$eval(this.dateOfBirth, el => el.validationMessage);
            console.log('Validation message for DOB:', message);
            return message;
        }
      }     
      
       
}
module.exports = { UserPage };
