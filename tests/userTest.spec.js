import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { credentials, URLs, expectedUrls } from '../testdata/loginData';
import { UserPage } from '../pages/userPage';
import { validationURLs, dropdownData , dropdownItems, fieldNames, fullNameData, mobileNoData, emailData, usernameData, passwordData, dateOfBirthData}  from '../testdata/userData';

test('Login with admin credentials to click on admin Console', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const actualUrl = await loginPage.goto(URLs.baseURL);
  // Validate the URL after navigation
  expect(actualUrl).toMatch(expectedUrls.loginSuccess);

  // Perform login with valid admin credentials
  const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
  console.log('Error message:', errorMsg);
  // Check if there is no error message
  expect(errorMsg).toBe(credentials[0].error);

  const userPage= new UserPage(page);
  // Click on Admin console link
  const url = await userPage.clickAdminConsole();
  
  // Validate that the admin console page is displayed
 expect(url).toContain(validationURLs.homePage);
});

test('Login with valid user credentials ,check if he has access to create user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const actualUrl = await loginPage.goto(URLs.baseURL);
    // Validate the URL after navigation
    expect(actualUrl).toMatch(expectedUrls.loginSuccess);
  
    // Perform login with valid admin credentials
    const errorMsg = await loginPage.login(credentials[2].username,credentials[2].password);
    console.log('Error message:', errorMsg);
    // Check if there is no error message
    expect(errorMsg).toBe(credentials[2].error);
  
    const userPage= new UserPage(page);
    // Click on Admin console link
    const url = await userPage.clickAdminConsole();
    
    // Validate that the admin console page is displayed
   expect(url).toContain(validationURLs.homePage);
  });

test('validating admin Console dropdown items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const actualUrl = await loginPage.goto(URLs.baseURL);
    // Validate the URL after navigation
    expect(actualUrl).toMatch(expectedUrls.loginSuccess);
  
    // Perform login with valid admin credentials
    const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
    console.log('Error message:', errorMsg);
    // Check if there is no error message
    expect(errorMsg).toBe(credentials[0].error);
  
    const userPage= new UserPage(page);
    
    // Click on Admin console dropdown
    const texts = await userPage.adminConsoleDropdown();
    
    expect(texts).toEqual(dropdownData.adminConsoleDropdownItems);

  });
  
test.describe('Create User and View Users', () => {
    dropdownItems.forEach((item) => {
        test(`${item.name}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const actualUrl = await loginPage.goto(URLs.baseURL);
            // Validate the URL after navigation
            expect(actualUrl).toMatch(expectedUrls.loginSuccess);
          
            // Perform login with valid admin credentials
            const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
            console.log('Error message:', errorMsg);
            // Check if there is no error message
            expect(errorMsg).toBe(credentials[0].error);
          
            const userPage= new UserPage(page);
            
            // Click on Admin console dropdown
            const texts = await userPage.adminConsoleDropdown();
                       
            // Click on Create User
            const createUserUrl = await userPage.clickDropdownItems(item.selectText);
            // Validate that the create user page is displayed  
            expect(createUserUrl).toMatch(item.url);
          });
    });
  });

test.describe('User Full Name field validations', () => {
  fullNameData.forEach((data) => {      
  test(`${data.Name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const actualUrl = await loginPage.goto(URLs.baseURL);
    // Validate the URL after navigation
    expect(actualUrl).toMatch(expectedUrls.loginSuccess);
  
    // Perform login with valid admin credentials
    const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
    console.log('Error message:', errorMsg);
    // Check if there is no error message
    expect(errorMsg).toBe(credentials[0].error);
  
    const userPage= new UserPage(page);
    
    // Click on Admin console dropdown
    const texts = await userPage.adminConsoleDropdown();
    
    expect(texts).toEqual(dropdownData.adminConsoleDropdownItems);
    // Click on Create User
    const createUserUrl = await userPage.clickDropdownItems(dropdownItems[0].selectText);
    // Validate that the create user page is displayed  
    expect(createUserUrl).toMatch(dropdownItems[0].url);
    const actualMessage = await userPage.validateFields(fieldNames.fullName,data.fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
  expect(actualMessage).toMatch(data.error);
  });
});
});

test.describe('Mobile number field validations', () => {
    mobileNoData.forEach((data) => {      
    test(`${data.Name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const actualUrl = await loginPage.goto(URLs.baseURL);
      // Validate the URL after navigation
      expect(actualUrl).toMatch(expectedUrls.loginSuccess);
    
      // Perform login with valid admin credentials
      const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
      console.log('Error message:', errorMsg);
      // Check if there is no error message
      expect(errorMsg).toBe(credentials[0].error);
    
      // Create an instance of UserPage
      const userPage= new UserPage(page);
      
      // Click on Admin console dropdown
      const texts = await userPage.adminConsoleDropdown();
      
      // Click on Create User
      const createUserUrl = await userPage.clickDropdownItems(dropdownItems[0].selectText);
      // Validate that the create user page is displayed  
      expect(createUserUrl).toMatch(dropdownItems[0].url);
      
      // Validate the full name field
      const actualMessage = await userPage.validateFields(fieldNames.fullName,fullNameData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMessage).toMatch(fullNameData[0].error);
      
      // Validate the mobile number field
      const actualMobileMessage = await userPage.validateFields(fieldNames.mobileNo,data.fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMobileMessage).toMatch(data.error);
    });
  });
});

test.describe('Email field validations', () => {
    emailData.forEach((data) => {      
    test(`${data.Name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const actualUrl = await loginPage.goto(URLs.baseURL);
      // Validate the URL after navigation
      expect(actualUrl).toMatch(expectedUrls.loginSuccess);
    
      // Perform login with valid admin credentials
      const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
      console.log('Error message:', errorMsg);
      // Check if there is no error message
      expect(errorMsg).toBe(credentials[0].error);
    
      // Create an instance of UserPage
      const userPage= new UserPage(page);
      
      // Click on Admin console dropdown
      const texts = await userPage.adminConsoleDropdown();
      
      // Click on Create User
      const createUserUrl = await userPage.clickDropdownItems(dropdownItems[0].selectText);
      // Validate that the create user page is displayed  
      expect(createUserUrl).toMatch(dropdownItems[0].url);
      
      // Validate the full name field
      const actualMessage = await userPage.validateFields(fieldNames.fullName,fullNameData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMessage).toMatch(fullNameData[0].error);
      
      // Validate the mobile number field
      const actualMobileMessage = await userPage.validateFields(fieldNames.mobileNo,mobileNoData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMobileMessage).toMatch(mobileNoData[0].error);

        // Validate the email field     
        const actualEmailMessage = await userPage.validateEmail(data.fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
        expect(actualEmailMessage).toMatch(data.error); 
    });
  });
});

test.describe('Username field validations', () => {
    usernameData.forEach((data) => {      
    test(`${data.Name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const actualUrl = await loginPage.goto(URLs.baseURL);
      // Validate the URL after navigation
      expect(actualUrl).toMatch(expectedUrls.loginSuccess);
    
      // Perform login with valid admin credentials
      const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
      console.log('Error message:', errorMsg);
      // Check if there is no error message
      expect(errorMsg).toBe(credentials[0].error);
    
      // Create an instance of UserPage
      const userPage= new UserPage(page);
      
      // Click on Admin console dropdown
      const texts = await userPage.adminConsoleDropdown();
      
      // Click on Create User
      const createUserUrl = await userPage.clickDropdownItems(dropdownItems[0].selectText);
      // Validate that the create user page is displayed  
      expect(createUserUrl).toMatch(dropdownItems[0].url);
      
      // Validate the full name field
      const actualMessage = await userPage.validateFields(fieldNames.fullName,fullNameData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMessage).toMatch(fullNameData[0].error);
      
      // Validate the mobile number field
      const actualMobileMessage = await userPage.validateFields(fieldNames.mobileNo,mobileNoData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMobileMessage).toMatch(mobileNoData[0].error);

        // Validate the email field     
        const actualEmailMessage = await userPage.validateEmail(emailData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
        expect(actualEmailMessage).toMatch(emailData[0].error); 

        // Validate the username field
        const actualUsernameMessage = await userPage.validateFields(fieldNames.userName,data.fieldValue);       
        expect(actualUsernameMessage).toContain(data.error);
    });
  });
});

test.describe('Password field validations', () => {
    passwordData.forEach((data) => {      
    test(`${data.Name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const actualUrl = await loginPage.goto(URLs.baseURL);
      // Validate the URL after navigation
      expect(actualUrl).toMatch(expectedUrls.loginSuccess);
    
      // Perform login with valid admin credentials
      const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
      console.log('Error message:', errorMsg);
      // Check if there is no error message
      expect(errorMsg).toBe(credentials[0].error);
    
      // Create an instance of UserPage
      const userPage= new UserPage(page);
      
      // Click on Admin console dropdown
      const texts = await userPage.adminConsoleDropdown();
      
      // Click on Create User
      const createUserUrl = await userPage.clickDropdownItems(dropdownItems[0].selectText);
      // Validate that the create user page is displayed  
      expect(createUserUrl).toMatch(dropdownItems[0].url);
      
      // Validate the full name field
      const actualMessage = await userPage.validateFields(fieldNames.fullName,fullNameData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMessage).toMatch(fullNameData[0].error);
      
      // Validate the mobile number field
      const actualMobileMessage = await userPage.validateFields(fieldNames.mobileNo,mobileNoData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMobileMessage).toMatch(mobileNoData[0].error);

        // Validate the email field     
        const actualEmailMessage = await userPage.validateEmail(emailData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
        expect(actualEmailMessage).toMatch(emailData[0].error); 

        // Validate the username field
        const actualUsernameMessage = await userPage.validateFields(fieldNames.userName,usernameData[0].fieldValue);       
        expect(actualUsernameMessage).toContain(usernameData[0].error);

        // Validate the password field
        const actualPasswordMessage = await userPage.validateFields(fieldNames.password,data.fieldValue);   
        expect(actualPasswordMessage).toContain(data.error);
    });
  });
});

test.describe.only('Date of birth field validations', () => {
    dateOfBirthData.forEach((data) => {      
    test(`${data.Name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const actualUrl = await loginPage.goto(URLs.baseURL);
      // Validate the URL after navigation
      expect(actualUrl).toMatch(expectedUrls.loginSuccess);
    
      // Perform login with valid admin credentials
      const errorMsg = await loginPage.login(credentials[0].username,credentials[0].password);
      console.log('Error message:', errorMsg);
      // Check if there is no error message
      expect(errorMsg).toBe(credentials[0].error);
    
      // Create an instance of UserPage
      const userPage= new UserPage(page);
      
      // Click on Admin console dropdown
      const texts = await userPage.adminConsoleDropdown();
      
      // Click on Create User
      const createUserUrl = await userPage.clickDropdownItems(dropdownItems[0].selectText);
      // Validate that the create user page is displayed  
      expect(createUserUrl).toMatch(dropdownItems[0].url);
      
      // Validate the full name field
      const actualMessage = await userPage.validateFields(fieldNames.fullName,fullNameData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMessage).toMatch(fullNameData[0].error);
      
      // Validate the mobile number field
      const actualMobileMessage = await userPage.validateFields(fieldNames.mobileNo,mobileNoData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
      expect(actualMobileMessage).toMatch(mobileNoData[0].error);

        // Validate the email field     
        const actualEmailMessage = await userPage.validateEmail(emailData[0].fieldValue);    // const actualMessage = await userPage.validateFields(fieldName,fieldValue);
        expect(actualEmailMessage).toMatch(emailData[0].error); 

        //validate dob field
        const actualDOBMessage = await userPage.validateDOB(data.fieldValue);
        expect(actualDOBMessage).toContain(data.error);

    });
  });
});


