import {test,expect} from '@playwright/test'
import { addProductPage } from '../pages/addProductPage'
import { testdata,productTestcases,productTestcasesduplicatevalidation } from '../testdata/productData'

const fieldSelectorMap={

    ProductID:'[name="productId"]',
    ProductName: '[name="productName"]',
    SelectCategory: 'select[name="productCategory"]',
    Quantity: '[name="quantity"]',
    PricePerUnit: '[name="price"]',
    SelectVendor: 'select[name="vendorId"]',
    Toast: 'div.Toastify__toast-body',
    
                    
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



for (const {name,data,expectError,fieldTypeCheck ,checkReadOnlyField,expectdefaultvalue
} of productTestcases){

test(name,async({page})=>{

    console.log(`Running test: ${name}`);
    console.log('Data:', data);
    const prodpage=new addProductPage(page)
    await prodpage.goto(testdata.url.baseUrl) 
    await prodpage.login(testdata.usercredential.username,testdata.usercredential.password) 
    await prodpage.userClickOnProductTab();
    await prodpage.userClickOnAddProductBtn();


    if(checkReadOnlyField){

           await  prodpage.checkReadOnlyField(checkReadOnlyField.field,testdata.url.createprodpageurl)
            return

    }

    if(expectdefaultvalue){

        await prodpage.checkReadOnlyField(expectdefaultvalue.field,testdata.url.createprodpageurl)
        return
       
    }


      if (fieldTypeCheck?.type === 'dropdown') {
        
        await prodpage.fieldTypedropdownvalidation(fieldTypeCheck.field,fieldTypeCheck.expectedoptions,fieldTypeCheck.minoptions,testdata.url.createprodpageurl)
        return; // ✅ Skip rest of test (no form fill or URL check)

    }
    

    await prodpage.userentervalidproductdetails(data);
    await prodpage.userclickonaddbutton();

    
   

 
    if (expectError) {
        await prodpage.expectError(testdata.url.createprodpageurl,expectError.field,expectError.message)
        return;
    } 


})
}

test.describe.serial('Product Test Cases (Ordered)', () => {
  // Shared setup for all tests
  test.beforeEach(async ({ page }) => {
    const prodPage = new addProductPage(page);
    await prodPage.goto(testdata.url.baseUrl);
    await prodPage.login(testdata.usercredential.username, testdata.usercredential.password);
    await expect(page).toHaveURL(testdata.url.successloginurl);
    await prodPage.userClickOnProductTab();
    await prodPage.userClickOnAddProductBtn();
  });

  for (const { name, data, expectSuccessToast, expectFailureToast } of productTestcasesduplicatevalidation) {
    test(name, async ({ page }) => {
      const prodPage = new addProductPage(page);

      console.log(`Running test: ${name}`);
      console.log('Data:', data);

      await prodPage.userentervalidproductdetails(data);
      await prodPage.userclickonaddbutton();

      if (expectSuccessToast) {
        await prodPage.validateSuccessToast(data.ProductName);
      }

      if (expectFailureToast) {
        await prodPage.validateFailureToast(data.ProductName);
      }
    });
  }

  

});


