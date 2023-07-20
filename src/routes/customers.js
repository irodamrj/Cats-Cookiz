const express = require('express');
const router = express.Router();

const {
  getProfile,
  updateProfile,
  deleteProfile,
  getCart,
  resetCart,
  createCart,
} = require('../controllers/customers');

router.get('/', getProfile);
router.patch('/', updateProfile);
router.delete('/', deleteProfile);
router.get('/cart', getCart);
router.patch('/cart', resetCart);
router.post('/cart', createCart);

module.exports = router;
