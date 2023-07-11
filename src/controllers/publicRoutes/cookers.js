const express = require('express');
const router = express.Router();
const Dish = require('../../models/dish');
const { StatusCodes } = require('http-status-codes');

router.get('/', async (req, res) => {
  const dishes = await Dish.find().populate('cookerId');
  return res.status(StatusCodes.OK).send(dishes);
});

module.exports = router;
