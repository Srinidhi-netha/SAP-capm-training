const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    // Step 1 : Declare Regional Services
    const {
        RegionalSalesSrv,
        DateDimensionSrv,
        ProductDimensionSrv,
        GeoDimensionSrv
    } = this.entities;

    // ------------------------------------------------------------------
    // Create Date Dimension
    // ------------------------------------------------------------------

    this.on('createDateDimension', async (req) => {

        const {
            dateKey,
            fiscalYear,
            fiscalQuarterName,
            fiscalMonthNumber
        } = req.data;

        await INSERT.into(DateDimensionSrv).entries({
            dateKey,
            fiscalYear,
            fiscalQuarterName,
            fiscalMonthNumber
        });

        return 'Date Dimension Created Successfully';
    });

    // ------------------------------------------------------------------
    // Create Product Dimension
    // ------------------------------------------------------------------

    this.on('createProductDimension', async (req) => {

        const {
            productId,
            category,
            product,
            line
        } = req.data;

        await INSERT.into(ProductDimensionSrv).entries({
            productId,
            category,
            product,
            line
        });

        return 'Product Dimension Created Successfully';
    });

    // ------------------------------------------------------------------
    // Create Geo Dimension
    // ------------------------------------------------------------------

    this.on('createGeoDimension', async (req) => {

        const {
            geoId,
            region,
            country,
            city
        } = req.data;

        await INSERT.into(GeoDimensionSrv).entries({
            geoId,
            region,
            country,
            city
        });

        return 'Geo Dimension Created Successfully';
    });

    // ------------------------------------------------------------------
    // Create Regional Sales
    // ------------------------------------------------------------------

    this.on('createRegionalSales', async (req) => {

        const {
            Id,
            customer,
            netSales,
            grossSales,
            quantity,
            date_dateKey,
            product_productId,
            geo_geoId
        } = req.data;

        await INSERT.into(RegionalSalesSrv).entries({
            Id,
            customer,
            netSales,
            grossSales,
            quantity,
            date_dateKey,
            product_productId,
            geo_geoId
        });

        return 'Regional Sales Created Successfully';
    });

    // ------------------------------------------------------------------
    // Update Regional Sales
    // ------------------------------------------------------------------

    this.on('updateRegionalSales', async (req) => {

        const {
            Id,
            netSales,
            grossSales,
            quantity
        } = req.data;

        await UPDATE(RegionalSalesSrv)
            .set({
                netSales,
                grossSales,
                quantity
            })
            .where({
                Id
            });

        return 'Regional Sales Updated Successfully';
    });

    // ------------------------------------------------------------------
    // Delete Regional Sales
    // ------------------------------------------------------------------

    this.on('deleteRegionalSales', async (req) => {

        const { Id } = req.data;

        await DELETE.from(RegionalSalesSrv)
            .where({
                Id
            });

        return 'Regional Sales Deleted Successfully';
    });

    // ------------------------------------------------------------------
    // Read Regional Sales
    // ------------------------------------------------------------------

    this.on('readRegionalSales', async (req) => {

        const { Id } = req.data;

        const data = await SELECT
            .from(RegionalSalesSrv)
            .where({
                Id
            });

        return data;
    });

});