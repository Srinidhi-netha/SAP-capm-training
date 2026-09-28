const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
//Step 1: Declare Shopping Service
    const {AuthorSrv,BooksSrv,PublisherSrv,ShoppingBasket_BookSrv,ShoppingBasketSrv,CustomerSrv,Warehouse_BookSrv,WarehouseSrv} = this.entities;

this.on('createauthor', async (req) => {
    try {

        const {
            name,
            address,
            url
        } = req.data;

        const data = {
            name,
            address,
            url
        };

        await INSERT.into(AuthorSrv).entries({
            name,
            address,
            url
        });

        return data;
        // return 'Author Created Successfully';

    } catch (error) {
        console.log(error);
        req.error(500, error.message);
    }
});
    this.on('createbooks', async (req) => {
    const { publisher_name, author_name, author_address, ISBN, title, year, price } = req.data;
        await INSERT.into(BooksSrv).entries({
            publisher_name,
            author_name,
            author_address,
            ISBN,
            title,
            year,
            price
        });
        return 'Book Created Successfully';
    });
    this.on('createpublisher', async (req) => {
       const { name, address, phone, url } = req.data;
        await INSERT.into(PublisherSrv).entries({
            name,
            address,
            phone,
            url
        });
        return 'Publisher Created Successfully';
    });

    this.on('createShoppingBasket_Book', async (req) => {
        const { shoppingbasket_ID, books_ISBN, count } = req.data;
        await INSERT.into(ShoppingBasket_BookSrv).entries({
            shoppingbasket_ID, 
            books_ISBN, 
            count
        });
        return 'ShoppingBasketBook Created Successfully';
    });

    this.on('createShoppingBasket', async (req) => {
        const { ID, customers_email } = req.data;
        await INSERT.into(ShoppingBasketSrv).entries({
            ID,
            customers_email
        });
        return 'ShoppingBasket Created Successfully';
    });
 
    this.on('createcustomer', async (req) => {
        const { email, name, phone, address } = req.data;
        await INSERT.into(CustomerSrv).entries({
            email,
            name,
            phone,
            address
        });
        return 'Customer Created Successfully';
    });


    this.on('createwarehouse', async (req) => {
        const { code, phone, address } = req.data;
        await INSERT.into(WarehouseSrv).entries({
            code,
            phone,
            address
        });
        return 'Warehouse Created Successfully';
    });

 this.on('createwarehouse_book', async (req) => {
       const { warehouse_code, books_ISBN, count } = req.data;
        await INSERT.into(Warehouse_BookSrv).entries({
             warehouse_code,
             books_ISBN,
              count
        });
        return 'WarehouseBook Created Successfully';
    });
 
});