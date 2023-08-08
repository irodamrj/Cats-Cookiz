const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getAnOrder,
  createOrder,
  cancelOrder,
  createComment,
} = require('../controllers/orders');

router.get('/all', getAllOrders);
router.get('/:id', getAnOrder);
router.post('/', createOrder);
router.patch('/:id', cancelOrder);
router.post('/:id/review', createComment);

module.exports = router;
    