const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    // Step 1 : Declare Opportunity Services

    const {
        StaffMembersSrv,
        BusinessUnitsSrv,
        ExpenseCentersSrv,
        ProductGroupsSrv,
        ProductCatalogSrv,
        MarketRegionsSrv,
        MarketRegionTextsSrv,
        OpportunityStatesSrv,
        CalendarDimensionSrv,
        SalesOpportunitiesSrv,
        OpportunityLineItemsSrv
    } = this.entities;

    // =====================================================
    // Create Staff Member
    // =====================================================

    this.on('createStaffMember', async (req) => {

        const {
            employeeID,
            firstName,
            middleName,
            lastName,
            fullName,
            gender
        } = req.data;

        await INSERT.into(StaffMembersSrv).entries({
            employeeID,
            firstName,
            middleName,
            lastName,
            fullName,
            gender
        });

        return 'Staff Member Created Successfully';
    });

    // =====================================================
    // Create Business Unit
    // =====================================================

    this.on('createBusinessUnit', async (req) => {

        const {
            areaID,
            name,
            manager_employeeID
        } = req.data;

        await INSERT.into(BusinessUnitsSrv).entries({
            areaID,
            name,
            manager_employeeID
        });

        return 'Business Unit Created Successfully';
    });

    // =====================================================
    // Create Expense Center
    // =====================================================

    this.on('createExpenseCenter', async (req) => {

        const {
            areaID,
            expenseCode,
            centerName,
            manager_employeeID
        } = req.data;

        await INSERT.into(ExpenseCentersSrv).entries({
            areaID,
            expenseCode,
            centerName,
            manager_employeeID
        });

        return 'Expense Center Created Successfully';
    });

    // =====================================================
    // Create Product Group
    // =====================================================

    this.on('createProductGroup', async (req) => {

        const {
            categoryID,
            categoryName
        } = req.data;

        await INSERT.into(ProductGroupsSrv).entries({
            categoryID,
            categoryName
        });

        return 'Product Group Created Successfully';
    });

    // =====================================================
    // Create Product
    // =====================================================

    this.on('createProduct', async (req) => {

        const {
            productID,
            productName,
            category_categoryID,
            productOwner_employeeID
        } = req.data;

        await INSERT.into(ProductCatalogSrv).entries({
            productID,
            productName,
            category_categoryID,
            productOwner_employeeID
        });

        return 'Product Created Successfully';
    });

    // =====================================================
    // Create Market Region
    // =====================================================

    this.on('createMarketRegion', async (req) => {

        const {
            salesOrgID,
            countryCode,
            currencyCode
        } = req.data;

        await INSERT.into(MarketRegionsSrv).entries({
            salesOrgID,
            countryCode,
            currencyCode
        });

        return 'Market Region Created Successfully';
    });

    // =====================================================
    // Create Market Region Text
    // =====================================================

    this.on('createMarketRegionText', async (req) => {

        const {
            salesOrgID,
            language,
            salesOrgName
        } = req.data;

        await INSERT.into(MarketRegionTextsSrv).entries({
            salesOrgID,
            language,
            salesOrgName
        });

        return 'Market Region Text Created Successfully';
    });

    // =====================================================
    // Create Opportunity State
    // =====================================================

    this.on('createOpportunityState', async (req) => {

        const {
            statusID,
            language,
            stateText
        } = req.data;

        await INSERT.into(OpportunityStatesSrv).entries({
            statusID,
            language,
            stateText
        });

        return 'Opportunity State Created Successfully';
    });

    // =====================================================
    // Create Calendar Dimension
    // =====================================================

    this.on('createCalendarDimension', async (req) => {

        const {
            calendarDate,
            sapDate,
            dayOfWeek,
            weekNumber,
            monthCode,
            quarterCode,
            yearCode
        } = req.data;

        await INSERT.into(CalendarDimensionSrv).entries({
            calendarDate,
            sapDate,
            dayOfWeek,
            weekNumber,
            monthCode,
            quarterCode,
            yearCode
        });

        return 'Calendar Dimension Created Successfully';
    });

    // =====================================================
    // Create Sales Opportunity
    // =====================================================

    this.on('createSalesOpportunity', async (req) => {

        const {
            opportunityID,
            salesOrg_salesOrgID,
            expectedCloseDate,
            statusID,
            owner_employeeID,
            customerID,
            closeDate_calendarDate
        } = req.data;

        await INSERT.into(SalesOpportunitiesSrv).entries({
            opportunityID,
            salesOrg_salesOrgID,
            expectedCloseDate,
            statusID,
            owner_employeeID,
            customerID,
            closeDate_calendarDate
        });

        return 'Sales Opportunity Created Successfully';
    });

    // =====================================================
    // Create Opportunity Item
    // =====================================================

    this.on('createOpportunityItem', async (req) => {

        const {
            itemID,
            opportunity_opportunityID,
            product_productID,
            quantity,
            value,
            unit,
            currency,
            itemStatus_statusID
        } = req.data;

        await INSERT.into(OpportunityLineItemsSrv).entries({
            itemID,
            opportunity_opportunityID,
            product_productID,
            quantity,
            value,
            unit,
            currency,
            itemStatus_statusID
        });

        return 'Opportunity Item Created Successfully';
    });

    // =====================================================
    // Update Sales Opportunity
    // =====================================================

    this.on('updateSalesOpportunity', async (req) => {

        const {
            opportunityID,
            expectedCloseDate,
            customerID
        } = req.data;

        await UPDATE(SalesOpportunitiesSrv)
            .set({
                expectedCloseDate,
                customerID
            })
            .where({
                opportunityID
            });

        return 'Sales Opportunity Updated Successfully';
    });

    // =====================================================
    // Delete Sales Opportunity
    // =====================================================

    this.on('deleteSalesOpportunity', async (req) => {

        const { opportunityID } = req.data;

        await DELETE.from(SalesOpportunitiesSrv)
            .where({
                opportunityID
            });

        return 'Sales Opportunity Deleted Successfully';
    });

    // =====================================================
    // Read Sales Opportunity
    // =====================================================

    this.on('readSalesOpportunity', async (req) => {

        const { opportunityID } = req.data;

        const data = await SELECT.from(SalesOpportunitiesSrv)
            .where({
                opportunityID
            });

        return data;
    });

});