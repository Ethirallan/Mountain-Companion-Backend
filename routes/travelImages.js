const express = require('express');
const { getTravelImages, updateTravelImage, deleteTravelImage } = require('../controllers/travelImages');

const router = express.Router();

router
  .route('/:id')
  .get(getTravelImages)
  .put(updateTravelImage)
  .delete(deleteTravelImage);

module.exports = router;