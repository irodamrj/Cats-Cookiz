const express = require('express');
const router = express.Router();
const Dish = require('../../models/dish');
const Cooker = require('../../models/cooker');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

router.get('/', async (req, res) => {
  const dishes = await Dish.find().populate('cookerId');
  return res.status(StatusCodes.OK).json({ dishes });
});

router.get('/dish/:id', async (req, res) => {
  const dish = await Dish.findById({ _id: req.params.id }).populate('cookerId');
  if (!dish) {
    throw new CustomError.NotFoundError('Dish not found');
  }

  return res.status(StatusCodes.OK).json({ dish });
});

router.get('/about', (req, res) => {
  return res.status(StatusCodes.OK).json('This is about page');
});

router.get('/cookers', async (req, res) => {
  const cookers = await Cooker.find();
  return res.status(StatusCodes.OK).json({ cookers });
});

router.get('/cookers/:id', async (req, res) => {
  const cookerId = req.params.id;
  const cooker = await Cooker.findById(cookerId);
  const dishes = await Dish.find({ cookerId: cookerId });

  return res.status(StatusCodes.OK).json({ cooker, dishes });
});

module.exports = router;
