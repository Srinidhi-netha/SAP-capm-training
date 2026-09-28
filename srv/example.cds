using {Example18 as database} from '../db/prac.cds';

service ExampleServices{

    entity OrdersSrv as projection on database.Orders;
//multiple values
    action createOrders(
            ord:many OrdersSrv
    )returns many OrdersSrv;

    action updateOrders(
        orderId:Integer,
        orderDate : Date
    )returns String;



    

}

//many records 

/*action createOrders(
             ord:many OrdersSrv
    )returns many OrdersSrv;
    */