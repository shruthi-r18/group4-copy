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
    await prodpage.userClickOnProductTab();
    
 
})



test('validate-all fields in product page',async({page})=>{
    

    const prodpage=new addProductPage(page);
    await prodpage.goto(testdata.url.baseUrl) 
    await prodpage.login(testdata.usercredential.username,testdata.usercredential.password) 
    await prodpage.userClickOnProductTab(); 
   
    await prodpage.validateAllFieldsArePresent()



})

for (const {name,data,expectError} of productTestcases){

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


    const selector = fieldSelectorMap[expectError.field];
    const validationMessage = await page.$eval(selector, el => el.validationMessage);
    expect(validationMessage).toBe(expectError.message);

})
}