class salesOrderPage {
  constructor(page) {
    this.page = page;
    //this.salesOrderButton = 'a[href*="Sales Order"]';
    this.salesOrderButton = 'text=Sales Order';
    this.createOrderButton = 'text=Create Order';
    this.subject = 'input[name="subject"]';
    this.validTill = 'input[type="date"]';
    this.status = 'input[name="status"]';
    this.opportunity = '(//button[@class="action-button"])[1]';
    this.quote = '(//button[@class="action-button"])[2]';
    this.contact = '(//button[@class="action-button"])[3]';
    //this.billingAddress = page.locator('//label[text()="Billing Address"]/../textarea'); // If both label and text area embedded under one div tag, you can use this
    this.billingAddress = page.locator('//label[text()="Billing Address"]/following-sibling::textarea');

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

  async selectOpportunity(opportunityName) {
    // Click the lookup icon to open the popup
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.click(this.opportunity), // (//button[@class="action-button"])[1]
    ]);

    await popup.waitForLoadState('domcontentloaded');

    let found = false;

    while (!found) {
      const buttons = popup.locator('button.select-btn');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const onclick = await button.getAttribute('onclick');

        if (onclick && onclick.includes(opportunityName)) {
          await button.evaluate(btn => btn.click()); // Force click
          console.log(`✅ Selected opportunity: ${opportunityName}`);
          found = true;
          break;
        }
      }

      if (!found) {
        const nextButton = popup.locator('button:has-text("Next")');
        const isDisabled = await nextButton.isDisabled();

        if (isDisabled) {
          console.log(`❌ Opportunity "${opportunityName}" not found.`);
          break;
        }

        await nextButton.click();
        await popup.waitForSelector('table tbody tr');
      }
    }

    // Optional: Assert it was found
    if (!found) {
      throw new Error(`Opportunity "${opportunityName}" not found.`);
    }
  }

  async selectQuote(quoteSubject) {
    // Click the lookup icon to open the popup
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.click(this.quote), // (//button[@class="action-button"])[2]
    ]);

    await popup.waitForLoadState('domcontentloaded');

    let found = false;

    while (!found) {
      const buttons = popup.locator('button.select-btn');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const onclick = await button.getAttribute('onclick');

        if (onclick && onclick.includes(quoteSubject)) {
          await button.evaluate(btn => btn.click()); // Force click
          console.log(`✅ Selected Quote: ${quoteSubject}`);
          found = true;
          break;
        }
      }

      if (!found) {
        const nextButton = popup.locator('button:has-text("Next")');
        const isDisabled = await nextButton.isDisabled();

        if (isDisabled) {
          console.log(`❌ Quote "${quoteSubject}" not found.`);
          break;
        }

        await nextButton.click();
        await popup.waitForSelector('table tbody tr');
      }
    }

    // Optional: Assert it was found
    if (!found) {
      throw new Error(`Quote "${quoteSubject}" not found.`);
    }
  }

  async selectContact(contactName) {
    // Click the lookup icon to open the popup
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.click(this.contact), // (//button[@class="action-button"])[3]
    ]);

    await popup.waitForLoadState('domcontentloaded');

    let found = false;

    while (!found) {
      const buttons = popup.locator('button.select-btn');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const onclick = await button.getAttribute('onclick');

        if (onclick && onclick.includes(contactName)) {
          await button.evaluate(btn => btn.click()); // Force click
          console.log(`✅ Selected Contact: ${contactName}`);
          found = true;
          break;
        }
      }

      if (!found) {
        const nextButton = popup.locator('button:has-text("Next")');
        const isDisabled = await nextButton.isDisabled();

        if (isDisabled) {
          console.log(`❌ Contact "${contactName}" not found.`);
          break;
        }

        await nextButton.click();
        await popup.waitForSelector('table tbody tr');
      }
    }

    // Optional: Assert it was found
    if (!found) {
      throw new Error(`Contact "${contactName}" not found.`);
    }
  }

  async enterBillingAddress(address) {
    await this.billingAddress.fill(address);
  }

}

module.exports = { salesOrderPage };
