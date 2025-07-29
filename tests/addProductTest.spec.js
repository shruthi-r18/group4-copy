import {test,expect} from '@playwright/test'
import { addProductPage } from '../pages/addProductPage'
import { testdata,productTestcases } from '../testdata/productData'

const fieldSelectorMap={

    ProductID:'[name="productId"]',
    ProductName: '[name="productName"]',
    SelectCategory: 'select[name="productCategory"]',
    Quantity: '[name="quantity"]',
    PricePerUnit: '[name="price"]',
    SelectVendor: 'select[name="vendorId"]',
    SuccessToast:'div.Toastify__toast--success .Toastify__toast-body',
    FailureToast:'div.Toastify__toast--error >> .Toastify__toast-body'
                    
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

for (const {name,data,expectError,fieldTypeCheck ,checkReadOnlyField,expectdefaultvalue,expectSuccessToast,expectFailureToast
,expectfailuretoast} of productTestcases){

test(name,async({page})=>{

    console.log(`Running test: ${name}`);
    console.log('Data:', data);
    const prodpage=new addProductPage(page)
    await prodpage.goto(testdata.url.baseUrl) 
    await prodpage.login(testdata.usercredential.username,testdata.usercredential.password) 
    await prodpage.userClickOnProductTab();
    await prodpage.userClickOnAddProductBtn();


    if(checkReadOnlyField){
        const selector=fieldSelectorMap[checkReadOnlyField.field]
        const readonly=await page.locator(selector).getAttribute('readonly')
        expect(readonly).toBeNull
        console.log(`the field "{$checkReadOnlyField.field}"  is readonly`)
    }

    if(expectdefaultvalue){
        const selector=fieldSelectorMap[expectdefaultvalue.field]
        const value=await page.locator(selector).inputValue()
        console.log(`the default value for the field "{$expectdefaultvalue.field} is {$value}`)
        expect(value).toBe('0')
    }

    if (fieldTypeCheck) {
      const selector = fieldSelectorMap[fieldTypeCheck.field];


      if (fieldTypeCheck.type === 'dropdown') {
        const tagName = await page.locator(selector).evaluate(el => el.tagName);
        expect(tagName).toBe('SELECT');
        console.log(`✅ Field "${fieldTypeCheck.field}" is a dropdown.`);


        const options = await page.locator(selector).locator('option').allTextContents();
        console.log(`options found in "${fieldTypeCheck.field} is "`,options)
        if (fieldTypeCheck.expectedoptions) {
          expect(options).toEqual(fieldTypeCheck.expectedoptions);
        }
          else if(fieldTypeCheck.minoptions){
            expect(options.length).toBeGreaterThanOrEqual(fieldTypeCheck.minoptions)
        }else{
            expect(options.length).toBeGreaterThanOrEqual(0)
        }
          
          console.log(`✅ Dropdown "${fieldTypeCheck.field}" options are validated.`);
        }

      

      return; // ✅ Skip rest of test (no form fill or URL check)
    }




    await prodpage.userentervalidproductdetails(data);
    await prodpage.userclickonaddbutton();

    
   
    


    
  
  if (expectSuccessToast) {
    await expect(page).toHaveURL(testdata.url.prodpagesuccessurl, { timeout: 10000 });
    const actualprodname = data.ProductName.substring(0, 20);
    const message = `Product ${actualprodname} Successfully Added`;
    await expect(page.locator(fieldSelectorMap.SuccessToast)).toContainText(message);
  } 
  else if(expectFailureToast){
    
  }
    

    
    

   

    if (expectError) {
        await expect(page).not.toHaveURL(testdata.url.prodpagesuccessurl,{ timeout: 10000 })
        await expect(page).toHaveURL(testdata.url.createprodpageurl)
      const selector = fieldSelectorMap[expectError.field];
      if (!selector) {
        throw new Error(`Selector not found for field: ${expectError.field}`);
      }
      await page.waitForSelector(selector, { timeout: 5000 });
      const validationMessage = await page.$eval(selector, el => el.validationMessage);
      expect(validationMessage).toBe(expectError.message);
    } else {
      if (checkReadOnlyField?.field === 'ProductID') {
        await expect(page).toHaveURL(testdata.url.createprodpageurl, { timeout: 10000 });
        console.log('Product ID check — staying on create-product page');
    } else {
        await expect(page).toHaveURL(testdata.url.prodpagesuccessurl, { timeout: 10000 });
        console.log('No validation error expected. Test passed.');
  }
      
      
    }

})
}


///html/body/div[2]/div/div/div/div[1]