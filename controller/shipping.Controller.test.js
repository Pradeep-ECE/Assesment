const shippingController = require('./shipping.Controller');
const delivery=require('../models').delivery;
const shippingConfig=require('../models').shippingConfig;
const {to,TE}=require('../globalfunction');

const mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  };
  
  const mockResponse = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const ReE = jest
  .fn(() => {
    ReE(res, {}, 422);
  })
  .mockReturnValue({ success: false, error: {} });

jest.setTimeout(30000);

describe('shippingController', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
  });

  test('createDeliveryAndShipping', async () => {
    req = mockRequest();
    res = mockResponse();
     req.body = null 
    delivery.findOne =jest.fn()
    .mockRejectedValueOnce(new Error('Error'))
    .mockResolvedValueOnce(Promise.resolve({})); 
    delivery.create = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValueOnce(Promise.resolve({})); 
    shippingConfig.create = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValueOnce(Promise.resolve({})); 
  
    await shippingController.createDeliveryAndShipping(req, res);
    expect(res.statusCode).toBe(422);
    await shippingController.createDeliveryAndShipping(req, res);
    expect(res.statusCode).toBe(422);
    await shippingController.createDeliveryAndShipping(req, res);
    expect(res.statusCode).toBe(422);

})
test('createDeliveryAndShipping', async () => {
    req = mockRequest();
    res = mockResponse();
     req.body = { 
     "storeId":1,
     "name":"ports" ,
     "minimumSubtotal":6,
     "shippingType":"subtotal + tax", 
     "amountType":"percentage",  
     "from":7000, 
     "to":10000, 
     "deliveryId":1,
     "amount":7500
    };
    delivery.findOne =jest.fn()
    .mockRejectedValueOnce(new Error('Error'))
    .mockResolvedValue(Promise.resolve({})); 
    delivery.create = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({})); 
    shippingConfig.create = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({})); 
  
    // await shippingController.createDeliveryAndShipping(req, res);
    // expect(res.statusCode).toBe(422);
    // await shippingController.createDeliveryAndShipping(req, res);
    // expect(res.statusCode).toBe(422);
    // await shippingController.createDeliveryAndShipping(req, res);
    // expect(res.statusCode).toBe(422);
  
    
    await shippingController.createDeliveryAndShipping(req, res);
    expect(res.statusCode).toBe(422);

})
test('deleteDeliveryDetails', async () => {
    req = mockRequest();
    res = mockResponse();
    req.params = { "id":1} ;
    delivery.update = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({})); 
    await shippingController.deleteDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
    
    
    await shippingController.deleteDeliveryDetails(req, res);
    expect(res.statusCode).toBe(200);
  });
  test('deleteDeliveryDetails', async () => {
    req = mockRequest();
    res = mockResponse();
    req.params = null ;
    delivery.update = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve()); 
    await shippingController.deleteDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
});
test('getDeliveryDetails', async () => {
    req = mockRequest();
    res = mockResponse();
    req.params = { "id":1 } ;
    delivery.findAll = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({id:1})); 
    await shippingController.getDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
    
    
    await shippingController.getDeliveryDetails(req, res);
    expect(res.statusCode).toBe(200);
  });
  test('getDeliveryDetails', async () => {
    req = mockRequest();
    res = mockResponse();
    req.params = null ;
    delivery.findAll = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({id:1})); 
    await shippingController.getDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
    
    
    
  });
  test('editDeliveryDetails', async () => {
    req = mockRequest();
    res = mockResponse();
    req.body = { "id":1 ,
    "amountType": "percentage",
    "shippingType" :"subtotal",
    "from":200,
    "to":500} ;
    delivery.update = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({})); 
    shippingConfig.update=jest.fn()
    .mockRejectedValueOnce(new Error('Error'))
    .mockResolvedValue(Promise.resolve({})); 
    await shippingController.editDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
    await shippingController.editDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
    
    await shippingController.editDeliveryDetails(req, res);
    expect(res.statusCode).toBe(200);
    
    

  });
  test('editDeliveryDetails', async () => {
    req = mockRequest();
    res = mockResponse();
    req.body = null ;
    delivery.update = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({})); 
    shippingConfig.update=jest.fn()
    .mockRejectedValueOnce(new Error('Error'))
    .mockResolvedValue(Promise.resolve({})); 
    await shippingController.getDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
    await shippingController.getDeliveryDetails(req, res);
    expect(res.statusCode).toBe(422);
    
    
   
  });

  test('calculateShipping', async () => {
    req = mockRequest();
    res = mockResponse();
    req.body = {"shippingId":2,
    "subtotal":150,
    "tax":20
} ;
    delivery.findOne = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({})); 

    await shippingController.calculateShipping(req, res);
    expect(res.statusCode).toBe(422);
    await shippingController.calculateShipping(req, res);
    expect(res.statusCode).toBe(200);
    
    
   
  });
  test('editDeliveryDetails', async () => {
    req = mockRequest();
    res = mockResponse();
    req.body = null
    delivery.findOne = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValue(Promise.resolve({})); 
    await shippingController.calculateShipping(req, res);
    expect(res.statusCode).toBe(422);
    await shippingController.calculateShipping(req, res);
    expect(res.statusCode).toBe(422);
});
})