namespace Example18;

entity StaffMembers {
    key employeeID : Integer;

    firstName  : String(200);
    middleName : String(200);
    lastName   : String(200);
    fullName   : String(200);
    gender     : String(50);

    manager : Association to one StaffMembers;
}

entity BusinessUnits {
    key areaID : Integer;

    name : String(100);

    manager : Association to one StaffMembers;
}

entity ExpenseCenters {
    key areaID       : Integer;
    key expenseCode  : Integer;

    centerName : String(500);

    manager : Association to one StaffMembers;
}

entity ProductGroups {
    key categoryID : Integer;

    categoryName : String(500);
}

entity ProductCatalog {
    key productID : String(500);

    productName : String(500);

    category : Association to one ProductGroups;

    productOwner : Association to one StaffMembers;
}

entity MarketRegions {
    key salesOrgID : Integer;

    countryCode  : String(2);
    currencyCode : String(4);
}

entity MarketRegionTexts {
    key salesOrgID : Integer;
    key language   : String(2);

    salesOrgName : String(50);

    salesOrg : Association to one MarketRegions;
}

entity OpportunityStates {
    key statusID : Integer;
    key language : String(2);

    stateText : String(50);
}

entity CalendarDimension {

    key calendarDate : Date;

    sapDate     : String(8);
    dayOfWeek   : String(2);
    weekNumber  : String(6);
    monthCode   : String(6);
    quarterCode : String(5);
    yearCode    : String(4);
}

entity SalesOpportunities {

    key opportunityID : Integer;

    salesOrg : Association to one MarketRegions;

    expectedCloseDate : Date;

    statusID : Integer;

    owner : Association to one StaffMembers;

    customerID : Integer;

    closeDate : Association to one CalendarDimension;
}

entity OpportunityLineItems {

    key itemID : Integer;

    opportunity : Association to one SalesOpportunities;

    product : Association to one ProductCatalog;

    quantity : Decimal(20,3);

    value : Decimal(20,2);

    unit : String(50);

    currency : String(10);

    itemStatus : Association to one OpportunityStates;

    controllingArea : Association to one BusinessUnits;

    sendingCenter : Association to one ExpenseCenters;

    receivingCenter : Association to one ExpenseCenters;
}