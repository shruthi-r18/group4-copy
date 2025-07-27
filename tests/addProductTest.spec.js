import {test,expect} from '@playwright/test'
import { addProductPage } from '../pages/addProductPage'
import { testdata,productTestcases } from '../testdata/productData'


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

    const prodpage=new addProductPage(page)
    await prodpage.goto(testdata.url.baseUrl) 
    await prodpage.login(testdata.usercredential.username,testdata.usercredential.password) 
    await prodpage.userClickOnProductTab();
    await prodpage.userClickOnAddProductBtn();
    await prodpage.userentervalidproductdetails(data);
    await prodpage.userclickonaddbutton();

})
}