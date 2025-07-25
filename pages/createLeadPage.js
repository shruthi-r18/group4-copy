class CreateLeadPage {
    constructor(page) {
        this.page = page;
        // Example selectors
        
        this.Leadstab = 'a[href="/Leads"]';
        this.leadName = [name="name"];
        this.company =  [name="company"];
        this.leadSource = [name="leadSource"];
        this.industry = [name="industry"];
        this.annualRevenue = [name="annaulRevenue"];
        this.noOfEmployees = [name="noOfEmployees"];
        this.phoneNo = [name="phone"];
        this.email =  [name="email"];
        this.secondEmail =  [name="secondaryEmail"] ;
        this.leadStatus =  [name="leadStatus"] ;
        this.rating =  [name="rating"] ;
        this.assignedTo =  [name="assignedTo"] ;
        this.address =  [name="address"] ;
        this.city =  [name="city"] ;
        this.country =  [name="country"] ;
        this.postalCode =  [name="postalCode"] ;
        this.website =  [name="website"] ;
        this.campaign =  [name="campaign"] ;
        this.description =  [name="description"] ;
        this.createLead =  button[type="submit"];
    
    }

    async createLeadwithDetails(leadData){
        await this.page.click(this.Leadstab);
        await this.page.fill(this.leadName, leadData.name);
        await this.page.fill(this.company, leadData.company);
        await this.page.selectOption(this.leadSource, leadData.leadSource);
        await this.page.selectOption(this.industry, leadData.industry);
        await this.page.fill(this.annualRevenue, leadData.annualRevenue);
        await this.page.fill(this.noOfEmployees, leadData.noOfEmployees);
        await this.page.fill(this.phoneNo, leadData.phoneNo);
        await this.page.fill(this.email, leadData.email);
        await this.page.fill(this.secondEmail, leadData.secEmail);
        await this.page.selectOption(this.leadStatus, leadData.leadStatus);
        await this.page.selectOption(this.rating, leadData.rating);
        await this.page.selectOption(this.assignedTo, leadData.assignedTo);
        await this.page.fill(this.address, leadData.address);
        await this.page.fill(this.city, leadData.city);
        await this.page.selectOption(this.country, leadData.country);
        await this.page.fill(this.postalCode, leadData.postal_code);
        await this.page.fill(this.website, leadData.website);
        await this.page.selectOption(this.campaign, leadData.campaign);
        await this.page.fill(this.description, leadData.description);

        // Submit the form
        await this.submit();

    }      
}


   


module.exports = { CreateLeadPage };