class CreateUserPage {
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

  async goto(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
    return this.page.url();
  }
 

  async login(username, password) {
    await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginButton);
   
   // ✅ Check HTML5 validation messages only if fields are empty
  if (username=== '') {
    return await this.page.locator(this.errorMessageForBlankUsername).textContent();
  }

  if (password=== '') {
    return await this.page.locator(this.errorMessageForBlankPassword).textContent();
  }

  // ✅ Fallback: check if login failed by still being on login page
  const stillOnLogin = await this.page.locator(this.loginButton).isVisible();
  if (stillOnLogin) {
    return 'Invalid Credentials';
  }

  // ✅ Login success assumed
  return '';
}

}

module.exports = { CreateUserPage };
