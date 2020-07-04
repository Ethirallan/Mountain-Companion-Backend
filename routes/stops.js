const express = require('express');
const { getStops, updateStop, deleteStop, createStop } = require('../controllers/stops');

const router = express.Router();

router
  .route('/')
  .post(createStop);

router
  .route('/:id')
  .get(getStops)
  .patch(updateStop)
  .delete(deleteStop);

module.exports = router;