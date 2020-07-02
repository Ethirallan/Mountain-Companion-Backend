const express = require('express');
const { getTravels, getTravel, createTravel, updateTravel, deleteTravel } = require('../controllers/travels');

const router = express.Router();

router
  .route('/')
  .get(getTravels)
  .post(createTravel);

router
  .route('/:id')
  .get(getTravel)
  .patch(updateTravel)
  .delete(deleteTravel);

module.exports = router;