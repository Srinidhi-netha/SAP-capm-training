using{ Example18 as database} from '../db/Shopping';
 service ShoppingServices{

    
     entity AuthorSrv as projection on database.Author;

     entity BooksSrv as projection on database.Book;
     
     entity PublisherSrv as projection on database.Publisher;

     entity ShoppingBasket_BookSrv as projection on database.ShoppingBasketBook;

     entity ShoppingBasketSrv as projection on database.ShoppingBasket;

     entity CustomerSrv as projection on database.Customer;

     entity Warehouse_BookSrv as projection on database.WarehouseBook;

     entity WarehouseSrv as projection on database.Warehouse;


    action createauthor(
       name:String(255),
       address:String(255),
      url:String(50)
    )returns String;

  action createbooks(
       ISBN:String(255),
      year:Integer,
    title:String(255),
    price:Decimal(19, 0),
    author_name: String(255),
    author_address:String(255) ,
    publisher_name:String(255)
 )returns String;


action createpublisher(

    name:String(255),
    address:String(255),
    phone:String(255),
    url:String(255)

)returns String;

action createShoppingBasket_Book(
    
    count : Integer,
    books_ISBN : String(255),
    shoppingbasket_ID : Integer
)
returns array of ShoppingBasket_BookSrv;

action createShoppingBasket(
  ID:Integer,
  customers_email:String(255)
)returns String;

action createcustomer(

   email:String(255),
    name:String(255),
    phone:String(255),
    address:String(255)

)returns String;

action createwarehouse_book(
   
    count : Integer,
  books_ISBN : String(255),
  warehouse_code : Integer
)returns String;

action createwarehouse(
    code:Integer,
    phone:String(255),
    address:String(255)

)returns String;

 }