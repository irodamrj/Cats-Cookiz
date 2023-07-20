const express = require('express');
const router = express.Router();

const {
  getDishes,
  getADish,
  getAbout,
  getCookers,
  getACooker,
} = require('../controllers/public');

router.get('/', getDishes);
router.get('/dish/:id', getADish);
router.get('/about', getAbout);
router.get('/cookers', getCookers);
router.get('/cookers/:id', getACooker);

module.exports = router;
