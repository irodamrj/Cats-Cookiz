const express = require('express');
const router = express.Router();

const { isCookerApproved } = require('../middleware/authorization');
const {
  getProfile,
  updateProfile,
  getAllOrders,
  getAnOrder,
  updateAnOrdersStatus,
  createDish,
  deleteDish,
  getAllDishes,
  updateDish,
  setPaymentType,
} = require('../controllers/cookers');

router.get('/', getProfile);
router.patch('/', updateProfile);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getAnOrder);
router.patch('/orders/:id', updateAnOrdersStatus);
router.post('/dishes', isCookerApproved, createDish);
router.delete('/dishes/:id', deleteDish);
router.get('/dishes', getAllDishes);
router.patch('/dishes/:id', updateDish);
router.post('/paymentType', setPaymentType);

module.exports = router;
