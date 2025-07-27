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
        this.productTab = "//a[text()='Products']";
        this.addProductButton = "//span[text()='Add Product']";
        this.productId = '[name="productId"]';
        this.productName = '[name="productName"]';
        this.categoryDropdown = 'select[name="productCategory"]';
        this.quantity = '[name="quantity"]';
        this.pricePerUnit = '[name="price"]';
        this.vendorDropdown = 'select[name="vendorId"]';
        this.addButton = '[type="submit"]';
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
        const productTab = this.page.locator(this.productTab);
        await productTab.waitFor({ state: 'visible', timeout: 15000 });
        await productTab.click();
        await expect(this.page).toHaveURL((testdata.url.prodpagesuccessurl))
    }

    async userClickOnAddProductBtn(){
        const addProductButton = this.page.locator(this.addProductButton);
        await addProductButton.waitFor({ state: 'visible', timeout: 15000 } );
        await addProductButton.click();
    }

    async userentervalidproductdetails(data){
        //JavaScript object destructuring --- 
        //It extracts values from the data object and assigns them to variables with the same names.
        //ProductName || ''  (logical or operator) --  ensures you always pass a defined string 
        // playwright may show error or exception if it is an empty string

        const { ProductName, SelectCategory, Quantity, PricePerUnit, SelectVendor } = data;

        await this.page.fill(this.productName,testdata.ProductName || '')
        await this.page.waitForTimeout(2000)

        // await this.page.locator(this.categoryDropdown).selectOption({label:testdata.proddata.SelectCategory})
        // await this.page.waitForTimeout(5000)
        await this.page.selectOption(this.categoryDropdown,{label: SelectCategory || ''})
        await this.page.fill(this.quantity,Quantity || '')
        await this.page.fill(this.pricePerUnit,PricePerUnit || '')
        //await this.page.selectOption(this.vendorDropdown,{label:SelectVendor || ''})


    }

    async userclickonaddbutton(){
        await this.page.click(this.addButton)
    }

    async validateAllFieldsArePresent() {
        const productTab = this.page.locator(this.productTab);
        await productTab.waitFor({ state: 'visible', timeout: 15000 });
        await productTab.click();

        const addProductButton = this.page.locator(this.addProductButton);
        await addProductButton.waitFor({ state: 'visible', timeout: 15000 } );
        await addProductButton.click();

        await this.checkField(this.productId, 'Product ID');
        await this.checkField(this.productName, 'Product Name');
        await this.checkField(this.quantity, 'Quantity');
        await this.checkField(this.pricePerUnit, 'Price Per Unit');
        await this.checkField(this.vendorDropdown, 'Vendor Dropdown');
        await this.checkFieldWithText('button:has-text("save")', 'Save Button',1);
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