namespace Example18;

entity Customers {
    key customerId : Integer;
    name           : String(20);
    city           : String(20);

    order : Association to many Orders
        on order.customer = $self;
}

entity Orders {
    key orderId   : Integer;
    orderDate     : Date;

    customer : Association to one Customers;
    orderitem:Association to many OrderItems
     on orderitem.order=$self;

}

entity OrderItems{
    key itemId:Integer;
    quantity:Integer;
    order:Association to one Orders;
    product:Association to one Products;
    
}

entity Products{
    key productId:Integer;
    productName:String(20);
    price:Integer;
   orderitem:Association to many OrderItems
    on orderitem.product=$self;
}