const express = require('express');
const router = express.Router();

const {
  deleteCooker,
  deleteCustomer,
  updateOrder,
} = require('../controllers/admin');

router.delete('/cooker/:id', deleteCooker);
router.delete('/customer/:id', deleteCustomer);
router.patch('/order/:id', updateOrder);

module.exports = router;
