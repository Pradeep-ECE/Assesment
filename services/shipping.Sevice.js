const delivery=require('../models').delivery;
const shippingConfig=require('../models').shippingConfig
const {to,TE}=require('../globalfunction');

/**
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : createDeliveryAndShipping
    * Method createDeliveryAndShipping which is used to create  Delivery And Shipping 
 * @param {*} body it holds the whole data of Delivery And Shipping 
 * @returns if data fetched then return else run null or error message 
 */
const createDeliveryAndShipping= async function(body){
    let[err,data]=await to(delivery.findOne({
        where:{name:body.name}
    }));
    if(err) return TE(err.message);
    if(data) {
        console.log("DATA",data);
        return TE ("name already exist")
    }
    
    else{
        let[err1,data1]=await to(delivery.create(body));
        if(err1) return TE(err1.message);
        if(data1){
        let [err2,data2]=await to(shippingConfig.create(body));
        if(err2) return TE(err.message); 
        return {data1,data2}
    }
        
        
    }
}


/**
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : getDeliveryDetails
    * Method getDeliveryDetails which is used to get DeliveryDetails 
 * @param {*} body it holds the delivery id
 * @returns if data fetched then return else run null or error message 
 */
const getDeliveryDetails=async function(body){
    let[err,data]= await to(delivery.findAll({
        where:{id:body.id},
        include:{
            model:shippingConfig
        }
    }));
    if(err) return TE(err.message);
    return data;
}

/**
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : deleteDeliveryDetails
    * Method deleteDeliveryDetails which is used to delete delivery Details 
 * @param {*} body it holds the delivery id
 * @returns if data fetched then return else run null or error message 
 */
const deleteDeliveryDetails=async function(body){
    let[err,data]= await to(delivery.update({
        isDeleted:true},{
        where:{id:body.id},
     }));
    if(err) return TE(err.message);
         return data
    }


/**
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : editDeliveryDetails
    * Method editDeliveryDetails which is used to edit DeliveryDetails 
 * @param {*} body it holds the delivery id
 * @returns if data fetched then return else run null or error message 
 */

const editDeliveryDetails=async function(body){
    
    
    let[err,data]= await to(delivery.update({
        amountType:body.amountType,
        shippingType :body.shippingType },{
            where:{id:body.id}
    }));
    if(err) return TE(err.message);
    
        let[err1,data1]=await to(shippingConfig.update({
            from:body.from,
            to:body.to},{
            where:{deliveryId:body.id}
        }));
        if(err1) return TE(err1.message);
        return {data,data1}
    
}


/**
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : calculateShipping
    * Method calculateShipping which is used to calculate Shipping Values
 * @param {*} body it holds the shipping Id
 * @returns if data fetched then return else run null or error message 
 */
const calculateShipping =async function(body){
    let obj={};
    let err, data;
    [err,data]=await to(delivery.findOne({
        where:{id:body.shippingId},
        include:{
            model:shippingConfig,
            attributes: ['from','to','amount']
        }
        }));
        if(err) return TE(err.message);
        else{
            console.log(data.dataValues);
            // let minimumSubtotal=data.dataValues.minimumSubtotal;
            // console.log(data.dataValues.minimumSubtotal);
            // let from=data.dataValues.from;
            // 
            // let amountType=data.dataValues.amountType;
            // let shippingType=data.dataValues.shippingType
        //     if(minimumSubtotal>body.subtotal){
        //                 if(body.subtotal>=from && body.subtotal<=to){
        //                     if(amountType=='amount'){
        //                        obj['amount']= data.dataValues.amount
        //                     }
        //                     else{
        //                         obj['percentage'] = data.dataValues.amount/100*body.subtotal;
        //                     }
        //                     if(shippingType=='amount')
        //                     {
        //                         obj['amount']=data.dataValues.amount
        //                     }
        //                     else{
        //                         obj["subtotal + tax"]=body.subtotal+body.tax
        //                     }
        
        //                 }
        //             }

        //    let amount= body.subtotal+body.tax;
        //    obj["value"]=amount;

        let minSubtotal= data.dataValues.minimumSubtotal;
        console.log(minSubtotal);
        let from = data.shippingConfig.dataValues.from;
        let to= data.shippingConfig.dataValues.to;
        // console.log(data.datavalues.to);
        var amnt= data.dataValues.amount;
        // console.log(amnt);
        console.log("shipping:::::",data.dataValues.shippingType);
        console.log(from);
        // console.log(data.dataValues.shippingType);
        if(data.dataValues.shippingType=='subtotal'){
            if(body.subtotal>=minSubtotal){
                if(body.subtotal>= from && body.subtotal <=to){
                    let amount= data.shippingConfig.dataValues.amount;
                    if(data.dataValues.amountType=='amount'){
                        obj['amount']=amount;
                        return obj;
                    }
                    if(data.dataValues.amountType=='percentage'){
                        let percentage= (body.subtotal/amount)*100;
                        obj['percentage']= percentage;
                        return obj;
                    }
                }
            }
            else{
                return TE('subtotal is less than minimum subtotal')
            }
        }
        else if(data.dataValues.shippingType=='subtotal + tax'){
            let total= body.subtotal+body.tax;
            if(total>=minSubtotal){

                if(total>= from && total<= to){
    
                    let amount= data.shippingConfig.dataValues.amount;
                    if(data.dataValues.amountType=='amount'){
                        obj['amount']=amount;
                        console.log(obj)
                        return obj;
                    }
                    if(data.dataValues.amountType=='percentage'){
                        let percentage= Math.floor((total*amount)/100);
                        obj['percentage']= percentage;
                        console.log(obj);
                        return obj;
                    }
                }
            }
            else{
                return TE('subtotal is less than minimum subtotal')
            }
        }

    }
}

module.exports={createDeliveryAndShipping,getDeliveryDetails,deleteDeliveryDetails,editDeliveryDetails,calculateShipping}