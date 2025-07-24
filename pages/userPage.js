class userPage{
    constructor(page) {
        this.page = page;
      }
    
      username = '#username';
      password = '#inputPassword';
      loginButton = 'button[type="submit"]';
      adminConsoleButton = 'div.nav-link >> li:has-text("Admin Console")';
      dropdown = 'div.dropdown';
      createUser = 'div:has-text("Create User")';
      viewUser = 'div:has-text("View User")';
    
      errorMessageForBlankUsername = '.invalid-feedback';
      errorMessageForBlankPassword = '.invalid-feedback';
    
      usersFullName = 'input[name="empName"]';
      usersMobileNo = 'input[name="mobileNo"]';
      usersEmail = 'input[name="email"]';
      usersUsername = 'input[name="username"]';
      usersPassword = 'input[name="password"]';
    
}