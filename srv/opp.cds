using { Example18 as database } from '../db/MCT_opp';

service OpportunityServices {

    entity StaffMembersSrv       as projection on database.StaffMembers;

    entity BusinessUnitsSrv      as projection on database.BusinessUnits;

    entity ExpenseCentersSrv     as projection on database.ExpenseCenters;

    entity ProductGroupsSrv      as projection on database.ProductGroups;

    entity ProductCatalogSrv     as projection on database.ProductCatalog;

    entity MarketRegionsSrv      as projection on database.MarketRegions;

    entity MarketRegionTextsSrv  as projection on database.MarketRegionTexts;

    entity OpportunityStatesSrv  as projection on database.OpportunityStates;

    entity CalendarDimensionSrv  as projection on database.CalendarDimension;

    entity SalesOpportunitiesSrv as projection on database.SalesOpportunities;

    entity OpportunityLineItemsSrv as projection on database.OpportunityLineItems;


    action createStaffMember(
        employeeID : Integer,
        firstName  : String(200),
        middleName : String(200),
        lastName   : String(200),
        fullName   : String(200),
        gender     : String(50)
    ) returns String;

    action createBusinessUnit(
        areaID : Integer,
        name   : String(100),
        manager_employeeID : Integer
    ) returns String;

    action createExpenseCenter(
        areaID      : Integer,
        expenseCode : Integer,
        centerName  : String(500),
        manager_employeeID : Integer
    ) returns String;

    action createProductGroup(
        categoryID   : Integer,
        categoryName : String(500)
    ) returns String;

    action createProduct(
        productID : String(500),
        productName : String(500),
        category_categoryID : Integer,
        productOwner_employeeID : Integer
    ) returns String;

    action createMarketRegion(
        salesOrgID   : Integer,
        countryCode  : String(2),
        currencyCode : String(4)
    ) returns String;

    action createMarketRegionText(
        salesOrgID  : Integer,
        language    : String(2),
        salesOrgName : String(50)
    ) returns String;

    action createOpportunityState(
        statusID : Integer,
        language : String(2),
        stateText : String(50)
    ) returns String;

    action createCalendarDimension(
        calendarDate : Date,
        sapDate      : String(8),
        dayOfWeek    : String(2),
        weekNumber   : String(6),
        monthCode    : String(6),
        quarterCode  : String(5),
        yearCode     : String(4)
    ) returns String;

    action createSalesOpportunity(
        opportunityID     : Integer,
        salesOrg_salesOrgID : Integer,
        expectedCloseDate : Date,
        statusID          : Integer,
        owner_employeeID  : Integer,
        customerID        : Integer,
        closeDate_calendarDate : Date
    ) returns String;

    action createOpportunityItem(
        itemID : Integer,
        opportunity_opportunityID : Integer,
        product_productID : String(500),
        quantity : Decimal(20,3),
        value    : Decimal(20,2),
        unit     : String(50),
        currency : String(10),
        itemStatus_statusID : Integer
    ) returns String;

    action updateSalesOpportunity(
        opportunityID : Integer,
        expectedCloseDate : Date,
        customerID : Integer
    ) returns String;

    action deleteSalesOpportunity(
        opportunityID : Integer
    ) returns String;

    action readSalesOpportunity(
        opportunityID : Integer
    ) returns array of SalesOpportunitiesSrv;

}