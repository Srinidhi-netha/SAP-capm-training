using { Example18 as database } from '../db/regionalsales';

service RegionalServices {

    entity RegionalSalesSrv    as projection on database.RegionalSales;
    entity DateDimensionSrv    as projection on database.DateDimension;
    entity ProductDimensionSrv as projection on database.ProductDimension;
    entity GeoDimensionSrv     as projection on database.GeoDimension;
    

    // CREATE ACTIONS

    action createDateDimension(
        dateKey : String(20),
        fiscalYear : Integer,
        fiscalQuarterName : String(100),
        fiscalMonthNumber : Integer
    ) returns String;

    action createProductDimension(
        productId : Integer,
        category : String(100),
        product : String(100),
        line : String(100)
    ) returns String;

    action createGeoDimension(
        geoId : Integer,
        region : String(100),
        country : String(100),
        city : String(100)
    ) returns String;

    action createRegionalSales(
        Id : Int64,
        customer : String(100),
        netSales : Integer,
        grossSales : Integer,
        quantity : Integer,
        date_dateKey : String(20),
        product_productId : Integer,
        geo_geoId : Integer
    ) returns String;


    // UPDATE ACTION

    action updateRegionalSales(
        Id : Integer,
        netSales : Integer,
        grossSales : Integer,
        quantity : Integer
    ) returns String;


    // DELETE ACTION

    action deleteRegionalSales(
        Id : Integer
    ) returns String;


    // READ ACTION

    action readRegionalSales(
        Id : Integer
    ) returns array of RegionalSalesSrv;

}