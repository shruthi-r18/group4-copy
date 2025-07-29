
export const testData = {

  URLs: {
    url: 'http://49.249.28.218:8098',
    successLoginUrl:'http://49.249.28.218:8098/dashboard',
    successCampaignCreationURL:'http://49.249.28.218:8098/campaigns',
  },
  login: {
    username: 'rmgyantra',
    password: 'rmgy@9999',
  },
  campaigns: [
  {
    // Test case: Create campaign with all fields
    name: 'Product Launch',
    status: 'Active',
    targetSize: '1000',
    expectedCloseDate: '2025-12-28',
    targetAudience: 'customers',
    description: 'Create campaign with all fields',
    
  },
  {
    // Test case: Create campaign with only mandatory fields
    name: 'Product Launch',
    targetSize: '1000',

  },
  {
      // Test case: Campaign name empty
      name: '',
      status: 'Active',
      targetSize: '1000',
      expectedCloseDate: '2025-12-28',
      targetAudience: 'customers',
      description: 'Campaign with empty name',
      expectedValidationField: 'campaignName',
      expectedValidationMessage: 'Please fill out this field'
    },
    {
      // Test case: Target size empty
      name: 'Product Launch',
      status: 'Active',
      targetSize: '',
      expectedCloseDate: '2025-12-28',
      targetAudience: 'customers',
      description: 'Campaign with empty target size',
      expectedValidationField: 'targetSize',
      expectedValidationMessage: 'Please fill out this field'
  },
  {
    // Test case: Target size negative
  name: 'Product Launch',
  status: 'Active',
  targetSize: '-10',
  expectedCloseDate: '2025-12-28',
  targetAudience: 'customers',
  description: 'Campaign with negative target size',
  expectedValidationField: 'targetSize',
  expectedValidationMessage: 'Value must be greater than or equal to 0'
},
{
  // Test case: Expected close date in the past
  name: 'Product Launch',
  status: 'Active',
  targetSize: '1000',
  expectedCloseDate: '2020-01-11', // Past date
  targetAudience: 'customers',
  description: 'Campaign with past close date',
  expectedValidationField: 'expectedCloseDate',
  expectedValidationMessagePrefix: 'Value must be ',
  expectedValidationMessageSuffix: ' or later'
},
{
  // Test case: Expected close date in invalid format
  name: 'Product Launch',
  status: 'Active',
  targetSize: '1000',
  expectedCloseDate: '30-12-2025', // Invalid format
  targetAudience: 'customers',
  description: 'Campaign with invalid date format',
  expectedValidationField: 'expectedCloseDate',
  expectedValidationMessage: 'Please enter a valid date in YYYY-MM-DD format'
},
{
  // Test case: Expected close date with month greater than 12
  name: 'Product Launch',
  status: 'Active',
  targetSize: '1000',
  expectedCloseDate: '2026-13-21', // Invalid month
  targetAudience: 'customers',
  description: 'Campaign with month greater than 12',
  expectedValidationField: 'expectedCloseDate',
  expectedValidationMessage: 'Please enter a valid date'
},
{
  // Test case: Edit and update campaign
  name: 'Product Campaign',
  status: 'Planned',
  targetSize: '500',
  expectedCloseDate: '2025-09-25',
  targetAudience: 'customers',
  description: 'Initial campaign for edit test',
  updatedStatus: 'Active',
  
},
{
  // Test case: Campaign name with special characters and numbers
  name: '@123!$%',
  status: 'Active',
  targetSize: '1000',
  expectedCloseDate: '2025-12-28',
  targetAudience: 'customers',
  description: 'Campaign with invalid name',
  expectedValidationField: 'campaignName',
  expectedValidationMessage: 'Please fill out this field'
}

]
};