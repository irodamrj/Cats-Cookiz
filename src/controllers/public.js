const Dish = require('../models/dish');
const Cooker = require('../models/cooker');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getDishes = async (req, res) => {
  const dishes = await Dish.find().populate('cookerId').limit(10);
  return res.status(StatusCodes.OK).json({ dishes });
};

const getADish = async (req, res) => {
  const dish = await Dish.findById({ _id: req.params.id }).populate('cookerId');
  if (!dish) {
    throw new CustomError.NotFoundError('Dish not found');
  }

  return res.status(StatusCodes.OK).json({ dish });
};

const getAbout = async (req, res) => {
  return res.status(StatusCodes.OK).json('This is about page');
};

const getCookers = async (req, res) => {
  const cookers = await Cooker.find();
  return res.status(StatusCodes.OK).json({ cookers }).limit(10);
};

const getACooker = async (req, res) => {
  const cookerId = req.params.id;
  const cooker = await Cooker.findById(cookerId);
  const dishes = await Dish.find({ cookerId: cookerId });

  return res.status(StatusCodes.OK).json({ cooker, dishes });
};

module.exports = { getDishes, getADish, getAbout, getCookers, getACooker };
