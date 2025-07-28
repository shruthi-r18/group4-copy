
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
        ProductName : faker.commerce.productName.toString(),
        SelectCategory:'Electronics',
        Quantity:'5',
        PricePerUnit:'550',
        SelectVendor:' '
    }

};

export const productTestcases=[
    {
        name:'valid product details',
        data:testdata.validproddata,
        expectError:false
    },
    {
        name:'blank product name',
        data:{...testdata.validproddata,ProductName:''},
        expectError: { field: 'ProductName', message: 'Please fill out this field.' }
    },
    {
        name : 'blank SelectCategory',
        data:{...testdata.validproddata,SelectCategory:''},
        expectError: { field: 'SelectCategory', message: 'Please select an item in the list.' }
    },
    {
         name : 'blank Quantity',
        data:{...testdata.validproddata,Quantity:''},
         expectError: { field: 'Quantity', message: 'Please fill out this field.' }

    },
    {
        name : 'blank PricePerUnit',
        data:{...testdata.validproddata,PricePerUnit:''},
       expectError: { field: 'PricePerUnit', message: 'Please fill out this field.' }

    },
    {
        name : 'blank SelectVendor',
        data:{...testdata.proddata,SelectVendor:''},
        expectError:{field:'SelectVendor',message:'Please select an item in the list.'}

    }
 

]

