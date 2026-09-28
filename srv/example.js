const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
//Step 1: Declare Employee Service
    const { OrdersSrv} = this.entities;


this.on('createOrders', async (request, response) => {

        // Step-2 : Get the data which is coming from the API
        const{ ord} = request.data;

        // Step - 3 : Instantiate the transaction object
        const objTransaction = cds.tx(request);

        // Step - 4 : Insert the record into database
        let returnData = await objTransaction.run(
            INSERT.into(OrdersSrv).entries(ord)
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
        return ord;
    })
//updating Product
    this.on('updateOrders', async(request, response)=>{
        const{
            orderId,
            orderDate 
            
        }=request.data;
    
        try{
            const objTransaction=cds.tx(request);
    
            await objTransaction.update(OrdersSrv).with({
            
                orderDate
                
            }).where({
                orderId:orderId,
               
            })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    
            return "Successfully updated.";
        }catch(error){
            request.error("Error: ",error)
        }
    })

})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
