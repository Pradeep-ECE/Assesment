const router=require('express').Router();
const {to,ReE,ReS}=require('../globalfunction');
const shippingService=require('../services/shipping.Sevice');
const shippingValidator=require('../routes/shipping.validator');
const ValidateSchema=require('../middleware/validator-schema');
/*
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : createDeliveryAndShipping
    * Method createDeliveryAndShipping which is used to create the Delivery and shipping 
*/
const createDeliveryAndShipping = async function(req,res){
    let body=req && req.body ? req.body:null;
    let [err,data]=await to(shippingService.createDeliveryAndShipping(body));
    if(err) ReE(res,err,422);
    if(data) return ReS(res,data,200);
}

/*
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : getDeliveryDetails
    * Method getDeliveryDetails which is used to get all the Delivery Details   
*/
const getDeliveryDetails =async function(req,res){
    let body=req && req.params ? req.params:null;
    let [err,data]=await to(shippingService.getDeliveryDetails(body));
    if(err) ReE(res,err,422);
    if(data) return ReS(res,data,200);
}

/*
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : getCategory
    * Method deleteDeliveryDetails which is used to delete  the DeliveryDetails   
*/
const deleteDeliveryDetails =async function(req,res){
    let body=req && req.body ? req.params:null;
    let [err,data]=await to(shippingService.deleteDeliveryDetails(body));
    if(err) ReE(res,err,422);
    if(data) return ReS(res,data,200);
}

/*
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : editDeliveryDetails
    * Method editDeliveryDetails which is used to edit  the Delivery Details
*/
const editDeliveryDetails =async function(req,res){
    let body=req && req.body ? req.body:null;
    let [err,data]=await to(shippingService.editDeliveryDetails(body));
    if(err) ReE(res,err,422);
    if(data) return ReS(res,data,200);
}

/*
    * Original Author: PRADEEP M
    * Author         : PRADEEP M
    * created On     : 19-06-2023
    * Modified On    : 19-06-2023
    * Function       : calculateShipping
    * Method calculateShipping which is used to calculate  the shipping values   
*/
const calculateShipping =async function(req,res){
    let body=req && req.body ? req.body:null;
    let [err,data]=await to(shippingService.calculateShipping(body));
    if(err) ReE(res,err,422);
    if(data) return ReS(res,data,200);
}

router.post('/create',shippingValidator.shippingValidator.create,ValidateSchema.validate,createDeliveryAndShipping);
router.post('/delete/:id',shippingValidator.shippingValidator.delete,ValidateSchema.validate,deleteDeliveryDetails);
router.get('/get/:id',shippingValidator.shippingValidator.get,ValidateSchema.validate,getDeliveryDetails);
router.post('/edit',shippingValidator.shippingValidator.edit,ValidateSchema.validate,editDeliveryDetails);
router.post('/calculate',shippingValidator.shippingValidator.calcutate,ValidateSchema.validate,calculateShipping);

module.exports={router,createDeliveryAndShipping,deleteDeliveryDetails,editDeliveryDetails,getDeliveryDetails,calculateShipping}