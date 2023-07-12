const express = require('express');
const router = express.Router();
const Dish = require('../../models/dish');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

router.get('/', async (req, res) => {
  const dishes = await Dish.find().populate('cookerId');
  return res.status(StatusCodes.OK).send(dishes);
});

router.get('/about', (req, res) => {
  return res.status(StatusCodes.OK).send('This is about page');
});

router.get('/:id', async (req, res) => {
  const dish = await Dish.findById({ _id: req.params.id }).populate('cookerId');
  if (!dish) {
    throw new CustomError.NotFoundError('Dish not found');
  }

  return res.status(StatusCodes.OK).send(dish);
});

module.exports = router;
