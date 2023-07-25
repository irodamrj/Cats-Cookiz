const express = require('express');
const router = express.Router();

const {
  deleteCooker,
  deleteCustomer,
  updateOrder,
  getDishes,
  getCookers,
  getCustomers,
} = require('../controllers/admin');

router.delete('/cooker/:id', deleteCooker);
router.delete('/customer/:id', deleteCustomer);
router.patch('/order/:id', updateOrder);
router.get('/customers', getCustomers);
router.get('/cookers', getCookers);
router.get('/dishes', getDishes);

module.exports = router;
