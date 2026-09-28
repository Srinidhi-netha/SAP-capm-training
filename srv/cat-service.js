const cds = require('@sap/cds');
const { csv } = require('@sap/cds/lib/compile/load');
module.exports = cds.service.impl(async function () {
//Step 1: Declare Employee Service
    const { EmployeeSrv ,ProductSrv,PurchaseOrderSrv,PurchaseItemsSrv,getHighestSalariedEmployees} = this.entities;
    const {uuid,exists,isdir,read}=cds.utils;
    // Implementation of an action
    // There are 3 generic handlers
    // .before() : Pre-check and validation
    // .on() : Performing DB operations
    // .after() : To save / close connections
//changes in git repo
    this.on('createEmployee', async (request, response) => {

        // Step-2 : Get the data which is coming from the API
        const empData = request.data;

        // Step - 3 : Instantiate the transaction object
        const objTransaction = cds.tx(request);

        // Step - 4 : Insert the record into database
        let returnData = await objTransaction.run(
            INSERT.into(EmployeeSrv).entries(empData)
        ).then((resolve, reject) => {

            if (typeof(resolve) !== undefined) {
                return request.data
            } else {
                request.error(500, "Error in inserting data into the database")
            }

        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })

        // Step - 5 : Return the data
        return returnData;
    })


//address
    this.on('createAddress', async (request, response) => {

        // Step-2 : Get the data which is coming from the API
        const empData = request.data;

        // Step - 3 : Instantiate the transaction object
        const objTransaction = cds.tx(request);

        // Step - 4 : Insert the record into database
        let returnData = await objTransaction.run(
            INSERT.into(EmployeeSrv).entries(empData)
        ).then((resolve, reject) => {

            if (typeof(resolve) !== undefined) {
                return request.data
            } else {
                request.error(500, "Error in inserting data into the database")
            }

        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })

        // Step - 5 : Return the data
        return returnData;
    })

//updating employee
this.on('updateEmployee', async(request, response)=>{
    const{
        ID,
        salaryAmount,
        Currency_code
    }=request.data;

    try{
        const objTransaction=cds.tx(request);

        await objTransaction.update(EmployeeSrv).with({
            salaryAmount:salaryAmount,
            Currency_code:Currency_code
        }).where({
            ID:ID
        })

        return "Successfully updated.";
    }catch(error){
        request.error("Error: ",error)
    }
})

//create products
this.on('createProduct', async (request, response) => {

        // Step-2 : Get the data which is coming from the API
        const empData = request.data;

        // Step - 3 : Instantiate the transaction object
        const objTransaction = cds.tx(request);

        // Step - 4 : Insert the record into database
        let returnData = await objTransaction.run(
            INSERT.into(ProductSrv).entries(empData)
        ).then((resolve, reject) => {

            if (typeof(resolve) !== undefined) {
                return request.data
            } else {
                request.error(500, "Error in inserting data into the database")
            }

        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })

        // Step - 5 : Return the data
        return returnData;
    })

//updating Product
this.on('updateProduct', async(request, response)=>{
    const{
        NODE_KEY,
        PRICE
    }=request.data;

    try{
        const objTransaction=cds.tx(request);

        await objTransaction.update(ProductSrv).with({
        
            PRICE : PRICE
            
        }).where({
            NODE_KEY       : NODE_KEY,
           
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

        return "Successfully updated.";
    }catch(error){
        request.error("Error: ",error)
    }
})
//DELETE COMMAND
this.on('deleteEmployee',async(request, response)=>{
    const{
        ID
    }=request.data;

    try{
        const objTransaction=cds.tx(request);

        await objTransaction.delete(EmployeeSrv).where({
            ID:ID
        })
        return "Successfully Deleted";

    }catch(error){
        request.error("Error: " ,error)
    }
})

this.before('UPDATE',EmployeeSrv,async(request,response) =>{
        const salaryAmount=request.data.salaryAmount;
        if( salaryAmount >100000){
            request.error(500,'Please get the approval from your line manager');
        }
 
    })

this.before('UPDATE', PurchaseItemsSrv, async (req) => {
 
        const grossAmt = req.data.Gross_Amt;
        const currency = req.data.CURRENCY_code;
 
        if (currency === 'USD' && grossAmt > 15000) {
        req.error(400, 'Please contact your Line Manager.');
        }
        if (currency === 'EUR' && grossAmt > 10000) {
            req.error(400, 'Please contact your Regional Head.');
        }
 
        });

        this.on('getHighestSalariedEmployees', async (request, response) => {

        try{
        // Step-2 : Get the data which is coming from the API
        const transaction = cds.tx(request);

        // Step - 3 : Instantiate the transaction object

        // Step - 4 : Insert the record into database
        const response = await transaction.read(EmployeeSrv).orderBy({
            salaryAmount:'desc'
        }).limit(10);

        return response;
        

        }catch(error) {
            request.error("Error :",error)
        }

        // Step - 5 : Return the data
        
    })



this.on('getHighestPricedProduct', async (request, response) => {

        try{
        // Step-2 : Get the data which is coming from the API
        const transaction = cds.tx(request);

        // Step - 3 : Instantiate the transaction object

        // Step - 4 : Insert the record into database
        const response = await transaction.read(ProductSrv).orderBy({
            PRICE:'desc'
        }).limit(1);

        return response;
        

        }catch(error) {
            request.error("Error :",error)
        }

        // Step - 5 : Return the data
        
    })

    this.on('discountPrice', async (request, response) => {
    try {

        // Step-1 : Get the parameter form the entity
        const ID = request.params[0];

        // Step-2 : Creating object for transaction service using request
        const transaction = cds.tx(request);

        // Step-3 : Update the purchase order service
        await transaction.update(PurchaseOrderSrv).with({
            GROSS_AMOUNT: {
                '-=': 1000
            },
            NET_AMOUNT: {
                '-=': 800
            },
            TAX_AMOUNT: {
                '-=': 200
            }
        }).where(ID);

        const updatePOInfo = await transaction.read(PurchaseOrderSrv);

        return updatePOInfo;

    } catch (error) {
        return "Error : " + error.toString();
    }
})

this.on('largestOrder',async(request, response)=> {

    try{

        //Step-2:Creating object for transaction service using request
        const transaction= cds.tx(request);

        const reply =await transaction.read(PurchaseOrderSrv).orderBy({
            GROSS_AMOUNT:'desc'
        }).limit(5);

        return reply;
    }catch (error) {
        return "Error : "+error.toString();
    }
})

this.on('increasePrice', async(request) =>{
    try{
        const ID = request.params[0];
        const transaction=cds.tx(request);
        await transaction.update(ProductSrv).with({
            PRICE: {
                '*=':1.10
            }
        }).where(ID);
        return await transaction.read(ProductSrv);

    }catch(error){
        return "Error : "+error.toString();
    }

});
this.on('top20Products',async(request)=> {

    try{

        //Step-2:Creating object for transaction service using request
        const transaction= cds.tx(request);

        const reply =await transaction.read(ProductSrv).orderBy({
            PRICE:'desc'
        }).limit(20);

        return reply;
    }catch (error) {
        return "Error : "+error.toString();
    }
})

this.on('increaseSalary', async (request) => {

    try {

        // Get Employee ID
        const ID = request.params[0];

        const transaction = cds.tx(request);

        // Increase salary by 15%
        await transaction.update(EmployeeSrv).with({
            salaryAmount: {
                '*=': 1.15
            }
        }).where(ID);

        const employeeInfo = await transaction.read(EmployeeSrv).where(ID);

        return employeeInfo[0];

    } catch (error) {

        return "Error : " + error.toString();

    }

});

this.on('top20HighestPaidEmployee', async (request) => {

    try {

        const transaction = cds.tx(request);

        const topEmployees = await transaction.read(EmployeeSrv)
            .orderBy('salaryAmount desc')
            .limit(20);

        return topEmployees;

    } catch (error) {

        return "Error : " + error.toString();

    }

});

// Utility Variables
this.on('getUtilities', async (request, response) => {
 
    let vUUID = uuid(),
        vPackageContent = null,
        vInput = "%E%A4%A",
        uri,
        dirExists = false,
        isFileExists = false;
 
    // Exists
    if (exists('srv/request.http')) {
        isFileExists = true;
    }
 
    // Is directory exists or not
    if (isdir('app')) {
        dirExists = true;
    }
 
    // Decode URI
    try {
        uri = decodeURI(vInput);
 
        // Make Directory
        await mkdirp('srv/lib');
 
    } catch {
        uri = vInput;
    }
 
    vPackageContent = await read('package.json');
 
    // Final Value
    var finalValue = {
        uuid: vUUID,
        uri: uri,
        isFileExists: isFileExists,
        dirExists: dirExists,
        packageInfo: vPackageContent
    };
 
    return finalValue;
});
 


})


