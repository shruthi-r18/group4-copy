import { expect } from '@playwright/test';
import { testdata,productTestcases } from '../testdata/productData';



class addProductPage {

    constructor(page) {
        this.page = page;

        // Login selectors
        this.username = '#username';
        this.password = '#inputPassword';
        this.loginButton = 'button[type="submit"]';

        // Product page selectors
        // this.productTab = "//a[text()='Products']";
        // this.addProductButton = "//span[text()='Add Product']";
        // this.productId = '[name="productId"]';
        // this.productName = '[name="productName"]';
        // this.categoryDropdown = 'select[name="productCategory"]';
        // this.quantity = '[name="quantity"]';
        // this.pricePerUnit = '[name="price"]';
        // this.vendorDropdown = 'select[name="vendorId"]';
        // this.addButton = '[type="submit"]';

         this.fieldSelectorMap={

      ProductTab: "//a[text()='Products']",
      AddProductButton: "//span[text()='Add Product']",
      ProductID: '[name="productId"]',
      ProductName: '[name="productName"]',
      SelectCategory: 'select[name="productCategory"]',
      Quantity: '[name="quantity"]',
      PricePerUnit: '[name="price"]',
      SelectVendor: 'select[name="vendorId"]',
      AddButton: '[type="submit"]',
      Toast: 'div.Toastify__toast-body',
    
                    
}
    }

    async goto(baseUrl) {
        await this.page.goto(baseUrl);
        await this.page.waitForLoadState('networkidle');
        return await this.page.url();
    }

    async login(username, password) {
        await this.page.fill(this.username, username);
        await this.page.fill(this.password, password);
        await this.page.click(this.loginButton);
    }
    async userClickOnProductTab(){
        const productTab = this.page.locator(this.fieldSelectorMap.ProductTab);
        await productTab.waitFor({ state: 'visible', timeout: 15000 });
        await productTab.click();
        await expect(this.page).toHaveURL((testdata.url.prodpagesuccessurl))
    }

    async userClickOnAddProductBtn(){
        const addProductButton = this.page.locator(this.fieldSelectorMap.AddProductButton);
        await addProductButton.waitFor({ state: 'visible', timeout: 15000 } );
        await addProductButton.click();
    }

    async userentervalidproductdetails(data){
        //JavaScript object destructuring --- 
        //It extracts values from the data object and assigns them to variables with the same names.
        //ProductName || ''  (logical or operator) --  ensures you always pass a defined string 
        // playwright may show error or exception if it is an empty string

        const { ProductName, SelectCategory, Quantity, PricePerUnit, SelectVendor } = data;

        await this.page.fill(this.fieldSelectorMap.ProductName,ProductName || '')
        await this.page.waitForTimeout(2000)

        // await this.page.locator(this.categoryDropdown).selectOption({label:testdata.proddata.SelectCategory})
        // await this.page.waitForTimeout(5000)
        if (SelectCategory) {
        await this.page.selectOption(this.fieldSelectorMap.SelectCategory, { label: SelectCategory });
        }
        await this.page.fill(this.fieldSelectorMap.Quantity,Quantity || '')
        await this.page.fill(this.fieldSelectorMap.PricePerUnit,PricePerUnit || '')

        if(SelectVendor){
            await this.page.selectOption(this.fieldSelectorMap.SelectVendor, { label: SelectVendor})
        }

    }

    async userclickonaddbutton(){
        await this.page.click(this.fieldSelectorMap.AddButton)
    }

    async validateSuccessToast(productName) {
    const expectedMsg = `Product ${productName.substring(0, 20)} Successfully Added`;
    const toast = this.page.locator('div.Toastify__toast-body');
    await toast.waitFor({ state: 'visible', timeout: 3000 });
    await expect(toast).toContainText(expectedMsg);
  }

  async validateFailureToast(productName) {
    const expectedMsg = `The Project Name :${productName.substring(0, 20)} Already Exists`;
    const toast = this.page.locator('div.Toastify__toast-body');
    await toast.waitFor({ state: 'visible', timeout: 3000 });
    await expect(toast).toContainText(expectedMsg);
  }

  async checkReadOnlyField(field,expectedurl) {
        const selector=this.fieldSelectorMap[field]
        const readonly=await this.page.locator(selector).getAttribute('readonly')
        expect(readonly).toBeNull
        console.log(`the field "{$field}"  is readonly`)
        await expect(this.page).toHaveURL(expectedurl, { timeout: 10000 })

    // await prodPage.checkReadOnlyField(checkReadOnlyField.field, testdata.url.createprodpageurl);
    // return;
  }

  async expectdefaultvalue(field,expectedurl){
    
    const selector=this.fieldSelectorMap[field]
    const value=await this.page.locator(selector).inputValue()
    console.log(`the default value for the field "{$expectdefaultvalue.field} is {$value}`)
    expect(value).toBe('0')
    await expect(this.page).toHaveURL(expectedurl, { timeout: 10000 });

  }
        
  async fieldTypedropdownvalidation(field,expectedoptions,minoptions,expectedurl){
    const selector = this.fieldSelectorMap[field];

    const tagName = await this.page.locator(selector).evaluate(el => el.tagName);
    expect(tagName).toBe('SELECT');
    console.log(`✅ Field "${field}" is a dropdown.`);
    const options = await this.page.locator(selector).locator('option').allTextContents();
    console.log(`options found in "${field} is "`,options)

    if (expectedoptions) {
          expect(options).toEqual(expectedoptions);
        }
          else if(minoptions){
            expect(options.length).toBeGreaterThanOrEqual(minoptions)
        }else{
            expect(options.length).toBeGreaterThanOrEqual(0)
        }
          
          console.log(`✅ Dropdown "${field}" options are validated.`);
          await expect(this.page).toHaveURL(expectedurl, { timeout: 10000 });

  }

  async expectError(expectedurl,field,message){
       // await expect(page).not.toHaveURL(testdata.url.prodpagesuccessurl,{ timeout: 10000 })
        await expect(this.page).toHaveURL(expectedurl)
        const selector = this.fieldSelectorMap[field];
        await this.page.waitForSelector(selector, { timeout: 5000 });
        const validationMessage = await this.page.$eval(selector, el => el.validationMessage);
        expect(validationMessage).toBe(message);
  }

    async userenternumericvalue(){
       
    return await this.productName.inputValue();
  
    }

    async validateAllFieldsArePresent() {
        const productTab = this.page.locator(this.fieldSelectorMap.ProductTab);
        await productTab.waitFor({ state: 'visible', timeout: 15000 });
        await productTab.click();

        const addProductButton = this.page.locator(this.fieldSelectorMap.AddProductButton);
        await addProductButton.waitFor({ state: 'visible', timeout: 15000 } );
        await addProductButton.click();

        await this.checkField(this.fieldSelectorMap.ProductID, 'Product ID');
        await this.checkField(this.fieldSelectorMap.ProductName, 'Product Name');
        await this.checkField(this.fieldSelectorMap.Quantity, 'Quantity');
        await this.checkField(this.fieldSelectorMap.PricePerUnit, 'Price Per Unit');
        await this.checkField(this.fieldSelectorMap.SelectVendor, 'Vendor Dropdown');
        await this.checkFieldWithText('button:has-text("save")', 'Save Button', 1);
        await this.checkFieldWithText('button:has-text("Cancel")', 'Cancel Button', 1);
    }

    async checkField(selector, fieldName) {
        const isVisible = await this.page.locator(selector).isVisible();
        if (isVisible) {
            console.log(`✅ ${fieldName} is visible`);
        } else {
            console.error(`❌ ${fieldName} is NOT visible`);
        }
    }

    async checkFieldWithText(selector, fieldName, expectedCount = 1) {
        const actualCount = await this.page.locator(selector).count();
        const status = actualCount === expectedCount
            ? `✅ ${fieldName} is ${expectedCount === 0? 'NOT present as expected' : 'present as expected'}`
            : `❌ ${fieldName} expected count ${expectedCount}, but found ${actualCount}`;
        console.log(status);
        
        if (actualCount !== expectedCount) {
        throw new Error(`${fieldName} count mismatch: expected ${expectedCount}, but found ${actualCount}`);
    }
    }


}

export { addProductPage }; 