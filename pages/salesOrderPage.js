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
    /* this.billingAddress = page.locator('//label[text()="Billing Address"]/following-sibling::textarea');   
    this.billingPOBox = page.locator('//label[text()="Billing PO Box"]//following-sibling::input');
    this.billingCity= '//label[text()="Billing City"]//following-sibling::input';
    this.billingState = '//label[text()="Billing State"]//following-sibling::input';
    this.billingPostalCode = '//label[text()="Billing Postal Code"]//following-sibling::input';
    this.billingCountry = '//label[text()="Billing Country"]//following-sibling::input';
    this.shippingAddress = '//label[text()="Shipping Address"]//following-sibling::input';;
    this.shippingPOBox= page.locator('//label[text()="Shipping PO Box"]//following-sibling::input');
    this.shippingCity = '//label[text()="City"]//following-sibling::input';
    this.shippingState = '//label[text()="State"]//following-sibling::input';
    this.shippingPostalCode = '//label[text()="Postal Code"]//following-sibling::input';
    this.shippingCountry= '//label[text()="Country"]//following-sibling::input';
    this.product = '(//button[@class="action-button"])[4]';
    this.quantity = '//label[text()="Quantity:"]/following-sibling::input[@type="number"]';
    this.discount= page.locator('//label[text()="Discount in $ (-):"]/../input');
    this.shippingCharges= page.locator('//label[text()="Shipping and Handling Charges in $ (+):"]/../input');
    this.createSalesOrderBtn = 'button[type=submit]';
 */



    // Billing
    this.billingAddress = page.locator('//label[text()="Billing Address"]/following-sibling::textarea');
    this.billingPOBox = page.locator('//label[text()="Billing PO Box"]/following-sibling::input');
    this.billingCity = page.locator('//label[text()="Billing City"]/following-sibling::input');
    this.billingState = page.locator('//label[text()="Billing State"]/following-sibling::input');
    this.billingPostalCode = page.locator('//label[text()="Billing Postal Code"]/following-sibling::input');
    this.billingCountry = page.locator('//label[text()="Billing Country"]/following-sibling::input');

    // Shipping
    this.shippingAddress = page.locator('//label[text()="Shipping Address"]/following-sibling::textarea');
    this.shippingPOBox = page.locator('//label[text()="Shipping PO Box"]/following-sibling::input');
    this.shippingCity = page.locator('//label[text()="City"]/following-sibling::input');
    this.shippingState = page.locator('//label[text()="State"]/following-sibling::input');
    this.shippingPostalCode = page.locator('//label[text()="Postal Code"]/following-sibling::input');
    this.shippingCountry = page.locator('//label[text()="Country"]/following-sibling::input');

    // Product
    this.productButton = this.page.locator('(//button[@class="action-button"])[4]');
    this.quantity = page.locator('//label[text()="Quantity:"]/following-sibling::input[@type="number"]');

    // Price related
    this.discount = page.locator('//label[text()="Discount in $ (-):"]/../input');
    this.shippingCharges = page.locator('//label[text()="Shipping and Handling Charges in $ (+):"]/../input');

    // Submit
    this.createSalesOrderBtn = page.locator('button[type=submit]');

    // Error message locator (common selector)
    this.errorMessages = page.locator('.error');

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

  // Billing methods
  async enterBillingAddress(address) {
    await this.billingAddress.fill(address);
  }

  async enterBillingPOBox(poBox) {
    await this.billingPOBox.fill(poBox);
  }

  async enterBillingCity(city) {
    await this.billingCity.fill(city);
  }

  async enterBillingState(state) {
    await this.billingState.fill(state);
  }

  async enterBillingPostalCode(postalCode) {
    await this.billingPostalCode.fill(postalCode);
  }

  async enterBillingCountry(country) {
    await this.billingCountry.fill(country);
  }

  // Shipping methods
  async enterShippingAddress(address) {
    await this.shippingAddress.fill(address);
  }

  async enterShippingPOBox(poBox) {
    await this.shippingPOBox.fill(poBox);
  }

  async enterShippingCity(city) {
    await this.shippingCity.fill(city);
  }

  async enterShippingState(state) {
    await this.shippingState.fill(state);
  }

  async enterShippingPostalCode(postalCode) {
    await this.shippingPostalCode.fill(postalCode);
  }

  async enterShippingCountry(country) {
    await this.shippingCountry.fill(country);
  }

  // Product selection
 /*  async clickProductLookup() {
    await this.productButton.click();
    // Handle the popup in another method (if needed)
  } */

  async selectProduct(productName) {
    // Click the lookup icon to open the popup
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.productButton.click(), // (//button[@class="action-button"])[4]
    ]);

    await popup.waitForLoadState('domcontentloaded');

    let found = false;

    while (!found) {
      const buttons = popup.locator('button.select-btn');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const onclick = await button.getAttribute('onclick');

        if (onclick && onclick.includes(productName)) {
          await button.evaluate(btn => btn.click()); // Force click
          console.log(`✅ Selected Product: ${productName}`);
          found = true;
          break;
        }
      }

      if (!found) {
        const nextButton = popup.locator('button:has-text("Next")');
        const isDisabled = await nextButton.isDisabled();

        if (isDisabled) {
          console.log(`❌ Product "${productName}" not found.`);
          break;
        }

        await nextButton.click();
        await popup.waitForSelector('table tbody tr');
      }
    }

    // Optional: Assert it was found
    if (!found) {
      throw new Error(`Product "${productName}" not found.`);
    }
  }



  async enterQuantity(value) {
    await this.quantity.fill(value);
  }

  // Price details
  async enterDiscount(value) {
    await this.discount.fill(value);
  }

  async enterShippingCharges(value) {
    await this.shippingCharges.fill(value);
  }

  // Submit sales order
  async submitSalesOrder() {
    await this.createSalesOrderBtn.click();
  }

  async getErrorText() {
    return this.errorMessages;
  }
  

}

module.exports = { salesOrderPage };
