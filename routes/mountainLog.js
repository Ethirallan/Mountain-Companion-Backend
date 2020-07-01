const express = require('express');
const { getMountainLogs, getMountainLogById, createMountainLog, removeMountainLogs } = require('../controllers/mountainLog');

const router = express.Router();

router
  .route('/')
  .get(getMountainLogs)
  .post(createMountainLog)
  .delete(removeMountainLogs);

router
.route('/:id')
.get(getMountainLogById);

module.exports = router;