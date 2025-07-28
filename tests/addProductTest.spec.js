import {test,expect} from '@playwright/test'
import { addProductPage } from '../pages/addProductPage'
import { testdata,productTestcases } from '../testdata/productData'

const fieldSelectorMap={
    ProductName: '[name="productName"]',
    SelectCategory: 'select[name="productCategory"]',
    Quantity: '[name="quantity"]',
    PricePerUnit: '[name="price"]',
    SelectVendor: 'select[name="vendorId"]'

}


test('validate that user click on product tab',async({page})=>{
    const prodpage=new addProductPage(page);
    await prodpage.goto(testdata.url.baseUrl)
    await prodpage.login(testdata.usercredential.username,testdata.usercredential.password)
    await expect(page).toHaveURL(testdata.url.successloginurl)
    await prodpage.userClickOnProductTab();
    
 
})



test('validate-all fields in product page',async({page})=>{
    

    const prodpage=new addProductPage(page);
    await prodpage.goto(testdata.url.baseUrl) 
    await prodpage.login(testdata.usercredential.username,testdata.usercredential.password) 
    await prodpage.userClickOnProductTab(); 
    
    await prodpage.validateAllFieldsArePresent()



})

for (const {name,data,expectError,fieldTypeCheck } of productTestcases){

test(name,async({page})=>{
    console.log(`Running test: ${name}`);
    console.log('Data:', data);
    const prodpage=new addProductPage(page)
    await prodpage.goto(testdata.url.baseUrl) 
    await prodpage.login(testdata.usercredential.username,testdata.usercredential.password) 
    await prodpage.userClickOnProductTab();
    await prodpage.userClickOnAddProductBtn();
    await prodpage.userentervalidproductdetails(data);

    await prodpage.userclickonaddbutton();

   if (fieldTypeCheck) {
      const selector = fieldSelectorMap[fieldTypeCheck.field];
      if (fieldTypeCheck.type === 'dropdown') {
        const tagName = await page.locator(selector).evaluate(el => el.tagName);
        expect(tagName).toBe('SELECT');
        console.log(`✅ Field "${fieldTypeCheck.field}" is a dropdown.`);
      }
      // Extend here for other types like 'textbox', 'checkbox', etc.
    } 



    if (expectError) {
      const selector = fieldSelectorMap[expectError.field];
      if (!selector) {
        throw new Error(`Selector not found for field: ${expectError.field}`);
      }

      const validationMessage = await page.$eval(selector, el => el.validationMessage);
      expect(validationMessage).toBe(expectError.message);
    } else {
      //String prodnametext= ProductName.t
      console.log('No validation error expected. Test passed.');
      
      //await expect(page).toHaveURL(testdata.url.prodpagesuccessurl,{ timeout: 10000 })
    }

})
}


///html/body/div[2]/div/div/div/div[1]