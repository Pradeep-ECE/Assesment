const{check,body,param,query}=require('express-validator');

const shippingValidator={
    create:[
        body('storeId').isNumeric().notEmpty().withMessage('storeId Must be a numaric'),
        body('name').isString().withMessage('name Must be a String'),
        body('minimumSubtotal').isNumeric().withMessage('minimumSubtotal must be numaric'),
        body('shippingType').isString().notEmpty().withMessage('shippingType Must be a String'),
        body('amountType').isString().withMessage('amountType Must be a String'),
        body('from').isNumeric().withMessage('from must be numaric'),
        body('to').isNumeric().notEmpty().withMessage('to Must be a numaric'),
        body('deliveryId').isNumeric().withMessage('deliveryId Must be a numaric'),
        body('amount').isNumeric().notEmpty().withMessage('amount must be numaric')
    
        
    ],
    get:[
        param('id').isNumeric().withMessage("ID is Invalid")    ],
    edit:[
        body('id').isNumeric().withMessage("ID is Invalid")
    ],
    delete:[
        param('id').isNumeric().withMessage("ID is Invalid")

    ],
    calcutate:[
        body('shippingId').isNumeric().withMessage("ID is Invalid"),
        body('subtotal').isNumeric().withMessage("subtotal is Invalid"),
        body('tax').isNumeric().withMessage("tax is Invalid")
    ]
}
module.exports = {shippingValidator};

