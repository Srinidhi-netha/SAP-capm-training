namespace Example18;

entity Author{
    key name : String(255);
    key address  : String(255);
    url      : String(255);
    books : Association to many Book on books.author = $self;
}
 
entity Publisher{
    key name : String(255);
    address  : String(255);
    phone    : String(255);
    url      : String(255);
    books : Association to many Book on books.publisher = $self;
}
 
entity Book{
    key ISBN : String(255);
    publisher : Association to one Publisher;
    author : Association to one Author;
    year  : Integer;
    title : String(255);
    price : Decimal(19,2);
    basketBooks : Association to many ShoppingBasketBook on basketBooks.books = $self;
    warehouseBooks : Association to many WarehouseBook on warehouseBooks.books = $self;
}
 
entity Customer{
    key email : String(255);
    name : String(255);
    phone : String(255);
    address : String(255);
    baskets : Association to many ShoppingBasket on baskets.customers = $self;
}
 
entity ShoppingBasket{
    key ID : Integer;
    customers : Association to one Customer;
    basketBooks : Association to many ShoppingBasketBook on basketBooks.shoppingbasket = $self;
}
 
entity ShoppingBasketBook{
    key shoppingbasket : Association to one ShoppingBasket;
    key books : Association to one Book;
    count : Integer;
}
 
entity Warehouse{
    key code : Integer;
    phone   : String(255);
    address : String(255);
    warehouseBooks : Association to many WarehouseBook on warehouseBooks.warehouse = $self;
}
 
entity WarehouseBook{
    key warehouse : Association to one Warehouse;
    key books      : Association to one Book;
    count : Integer;
}