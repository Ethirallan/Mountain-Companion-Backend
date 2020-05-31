const express = require('express');
const { getTravels, getTravel, createTravel, updateTravel, deleteTravel } = require('../controllers/travels');

const router = express.Router;

router
  .route('/')
  .get(getTravels)
  .post(createTravel);

router
  .route('/:id')
  .get(getTravels)
  .put(updateTravel)
  .delete(deleteTravel);

module.exports = router;