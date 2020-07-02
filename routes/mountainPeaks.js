const express = require('express');
const { getMountainPeaks, getMountainPeakById } = require('../controllers/mountainPeaks');

const router = express.Router();

router
  .route('/')
  .get(getMountainPeaks);

router
.route('/:id')
.get(getMountainPeakById);

module.exports = router;