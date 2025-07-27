
import {faker} from '@faker-js/faker'
export const testdata = {

    usercredential:{
    username: 'user_viji',
    password: 'v123456'
    },

    url:{
        baseUrl : 'http://49.249.28.218:8098',
        prodpagesuccessurl:'http://49.249.28.218:8098/products'
    },
    validproddata:{
        ProductName : faker.commerce.productName,
        SelectCategory:'Electronics',
        Quantity:'5',
        PricePerUnit:'550',
        //SelectVendor:'Select a Vendor'
    }

};

export const productTestcases=[
    {
        name:'valid product details',
        data:testdata.proddata,
        expectError:false
    },
    {
        name:'blank product name',
        data:{...testdata.proddata,ProductName:''},
        expectError: 'Please fill out this field'
    },
    {
        name : 'blank SelectCategory',
        data:{...testdata.proddata,SelectCategory:''},
        expectError: 'Please fill out this field'
    },
    {
         name : 'blank Quantity',
        data:{...testdata.proddata,Quantity:''},
        expectError: 'Please fill out this field'

    },
    {
        name : 'blank PricePerUnit',
        data:{...testdata.proddata,PricePerUnit:''},
        expectError: 'Please fill out this field'

    },
    /*
    {
        name : 'blank SelectVendor',
        data:{...testdata.proddata,SelectVendor:''},
        expectError: 'Please fill out this field'

    }
 */

]

