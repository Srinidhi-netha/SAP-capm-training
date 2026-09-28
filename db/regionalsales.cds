namespace Example18;


entity DateDimension {
    key dateKey           : String(5000);
        fiscalYear        : Integer;
        fiscalQuarterName : String(5000);
        fiscalMonthNumber : Integer;

        sales : Association to many RegionalSales
            on sales.date = $self;
}

entity ProductDimension {
    key product  : String(5000);
        category : String(5000);
        line     : String(5000);

        sales : Association to many RegionalSales
            on sales.product = $self;
}

entity GeoDimension {
    key city    : String(5000);
        region  : String(5000);
        country : String(5000);

        sales : Association to many RegionalSales
            on sales.geo = $self;
}

entity RegionalSales {
    key Id        : Int64;
     //city:String(5000);

        customer  : String(5000);
        netSales  : Integer;
        grossSales: Integer;
        quantity  : Integer;

        date    : Association to one DateDimension;
        product : Association to one ProductDimension;
        geo     : Association to one GeoDimension;
}