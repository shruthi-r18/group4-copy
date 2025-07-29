export const usercredential = 
{     
      username: 'crmtestuser',
      password: 'cRm_123$',     
}

export const data = {
    subject : 'Order for ABC Corp',
    validTillDate : '2025-09-30',
    status : 'Confirmed',
    opportunity : 'TechNova First Deal',
    quote : 'SalesOrderWM',
    contactName : 'John K',
     // Billing Address Details
    billingAddress : '123 Business Park Blvd',
    billingPOBox : '45678',
    billingCity : 'San Francisco',
    billingState : 'California',
    billingPostalCode : '94107',
    billingCountry: 'USA',
      // Shipping Address Details
    shippingAddress: '789 Warehouse Lane',
    shippingPOBox:'89012',
    shippingCity:'Los Angeles',
    shippingState:'California',
    shippingPostalCode:'90001',
    shippingCountry:'USA',
    product : 'Lenovo Laptop',
};

export const negativeTestCases = [
  {
    name: 'missing subject',
    field: 'subject',
    value: '',
    errorMessage: 'Please fill out this field',
  },
  {
    name: 'invalid postal code',
    field: 'billingPostalCode',
    value: 'ABC123!',
    errorMessage: 'Invalid postal code',
  },
  {
    name: 'invalid quantity',
    field: 'quantity',
    value: '-10',
    errorMessage: 'Quantity must be positive',
  },
  {
    name: 'missing status',
    field: 'status',
    value: '',
    errorMessage: 'Status is required',
  },
  {
    name: 'invalid valid till date',
    field: 'validTill',
    value: '2020-01-01', // Past date
    errorMessage: 'Valid Till date cannot be in the past',
  },
];







