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
    description: 'This campaign targeting  customers with special offers',
    
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
    }
]
};