import {test,expect} from '@playwright/test'

import { addProductPage } from '../pages/addProductPage'


import { usercredential } from '../testdata/productData'
test('validate that user click on product tab',async({page})=>{
    const prodpage=new addProductPage(page);
    await prodpage.goto()
    await prodpage.login(usercredential.username,usercredential.password)
    await prodpage.userClickOnProductTab();
})

test('validate-all fields in product page',async({page})=>{
    //step1:login to application
    // const userpageobj=new createUserPage(page);
    // await userpageobj.goto(URLs.baseURL)
    // await userpageobj.login(usercredential[0].username1,usercredential[0].password1)



    //step2:clicking on product tab

    const prodpage=new addProductPage(page);
    await prodpage.goto()
    await prodpage.login(usercredential.username,usercredential.password)

    
    await prodpage.validateAllFieldsArePresent()



})
