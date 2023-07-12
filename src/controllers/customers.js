const express = require('express');

const CustomerModel = require('../models/customer');
const CustomError = require('../errors');
const routes = express.Router();
const AddressModel = require('../models/address');

routes.get('/', async (req, res) => {
 
    const customer = await CustomerModel.findOne({ email: req.auth.email }).populate('address').populate('cart');
  
    res.json(customer);
 
   
    throw new CustomError.InternalServerError('Internal server error');
  
});

routes.patch('/', async (req, res) => {

    console.log(req.body.address)
    if(!req.body.address){
    const customer = await CustomerModel.findOneAndUpdate({ email: req.auth.email }, req.body,  { new: true }).populate('address');
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
    }else if(req.body.address.id){
      const { address, ...customerData } = req.body;
      const customer = await CustomerModel.findOneAndUpdate({ email: req.auth.email }, customerData, { new: true }).populate('address');
      const addressUpdated = await AddressModel.findByIdAndUpdate(req.body.address.id, req.body.address);
      console.log(customer)
      console.log(addressUpdated)

      await addressUpdated.save();
      await customer.save();
      res.json(customer);
    }else if(req.body.address&& !req.body.address.id){
      const customer = await CustomerModel.findOne({ email: req.auth.email }).populate('address');

     const  address = new AddressModel({
              street: req.body.address.street,
              city:req.body.address.city,
              country:req.body.address.country,
              buildingNumber:req.body.address.buildingNumber,
              flatNumber:req.body.address.flatNumber,
              floor:req.body.address.floor
              ,zipcode:req.body.address.zipcode,
              state:req.body.address.state,
              buildingName:req.body.address.buildingName
      });
      customer.address.push(address._id);
      await address.save();
      await customer.save();
      res.json(customer);
    }
    throw new CustomError.InternalServerError('Internal server error');
});

routes.delete('/', async (req, res) => {
 
    const customer = await CustomerModel.findOne({ email: req.auth.email });

    if(customer.address){
      const addressIds = customer.address;
      await AddressModel.deleteMany({ _id: { $in: addressIds } });
    }
    await customer.deleteOne();

    res.clearCookie('token', {
      signed: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 14 * 1000,
    });

    res.json('user is deleted and logout');
     throw new CustomError.InternalServerError('Internal server error');
  
});

routes.get('/cart', async (req, res) => {
 
    const customer = await CustomerModel.findOne({ email: req.auth.email });
    res.json(customer.cart);
  
    throw new CustomError.InternalServerError('Internal server error');
  
});

routes.delete('/cart', async (req, res) => {
    const customer = await CustomerModel.findOneAndUpdate({ email: req.auth.email }, {
      itemId: [],
      total: 0,
    }
      );
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer.cart);
    throw new CustomError.InternalServerError('Internal server error');
  
});
routes.post('/cart', async (req, res) => {
  //to add item to cart which is sepet
    const customer = await CustomerModel.findOne({ email: req.auth.email }); 
    let itemId = req.body.itemId;
    let total = req.body.total;
    if (!itemId || !total) {
      throw new CustomError.BadRequestError('Cart data incomplete');
    }
  //  const itemFound= customer.cart.itemId.includes(itemId)
  //  if(itemFound){
  //   customer.cart.total += total;
  //   customer.cart.amount+=1;
  //  }else{
    customer.cart.itemId.push(itemId);
    customer.cart.total += total;
    // customer.cart.amount=1;
  //  }
  //  console.log(itemFound)
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);  
    throw new CustomError.InternalServerError('Internal server error');
  
});


module.exports = routes;
