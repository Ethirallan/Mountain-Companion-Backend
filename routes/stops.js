const express = require('express');
const { getStops, updateStop, deleteStop } = require('../controllers/stops');

const router = express.Router();

router
  .route('/:id')
  .get(getStops)
  .put(updateStop)
  .delete(deleteStop);

module.exports = router;