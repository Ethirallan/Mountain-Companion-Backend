const express = require('express');
const { getTravelImages, updateTravelImage, deleteTravelImage, createTravelImage } = require('../controllers/travelImages');

const router = express.Router();

router
  .route('/')
  .post(createTravelImage);

router
  .route('/:id')
  .get(getTravelImages)
  .delete(deleteTravelImage);

module.exports = router;