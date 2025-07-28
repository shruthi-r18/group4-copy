
import {faker} from '@faker-js/faker'
export const testdata = {

    usercredential:{
    username: 'user_viji',
    password: 'v123456'
    },

    url:{
        baseUrl : 'http://49.249.28.218:8098',
        successloginurl:'http://49.249.28.218:8098/dashboard',
        prodpagesuccessurl:'http://49.249.28.218:8098/products'
    },
    validproddata:{
        ProductName : faker.commerce.productName(),
        SelectCategory:'Electronics',
        Quantity:'5',
        PricePerUnit:'550',
        SelectVendor:'Vendor_68320 - (Electronics)'
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
        expectError: { field: 'ProductName', message: 'Please fill out this field.' },
        fieldTypeCheck:null
    },
    {
        name:'validate product name field is not allowing to enter numeric value',
        data: {...testdata.proddata,ProductName:'12345'},
        expectError:'Product name cannot be numeric'
        
    },

    {
        name:'Validate SelectCategory is a dropdown',
        data:testdata.validproddata,
        expectError:false,
        fieldTypeCheck:{field:'SelectCategory',type:'dropdown'}

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
        name:'Validate SelectVendor is a dropdown',
        data:testdata.validproddata,
        expectError:false,
        fieldTypeCheck:{field:'SelectVendor',type:'dropdown'}

        },

    {
        name : 'blank SelectVendor',
        data:{...testdata.proddata,SelectVendor:''},
        expectError:{field:'SelectVendor',message:'Please select an item in the list.'}

    },
    {
        name : 'provide productname with one character',
        data:{...testdata.proddata,ProductName:'a'},
        expectError:{field:'ProductName',message:'Please lengthen this text to 2 characters or more (you are currently using 1 character).'}
        

    },
    {
        name : 'validates error message on Quantity  field with negative value',
        data:{...testdata.validproddata,Quantity:'-200'},
       expectError: { field: 'Quantity', message: 'Value must be greater than or equal to 0.' },
       

    },
    {
        name : 'validates error message on PricePerUnit  field with negative value',
        data:{...testdata.validproddata,PricePerUnit:'-200'},
       expectError: { field: 'PricePerUnit', message: 'Value must be greater than or equal to 0.' },
       

    }
 

]

