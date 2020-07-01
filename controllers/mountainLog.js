const MountainLog = require('../models/MountainLog');

// @desc      Get all mountain logs
// @route     GET /mountain-log
// @access    Private
exports.getMountainLogs = (req, res, next) => {

  MountainLog.getAll(req.auth_id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving mountain logs."
        });
      } else {
        res.status(200).json({
          success: true,
          message: data
        });
      }
  });
}

// @desc      Get mountain log by id
// @route     GET /mountain-log/:id
// @access    Private
exports.getMountainLogById = (req, res, next) => {
  MountainLog.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mountain logs."
      });
    } else {
      res.status(200).json({
        success: true,
        message: data
      });
    }
  });
}

// @desc      Create new mountain log
// @route     POST /mountain-log
// @access    Private
exports.createMountainLog = (req, res, next) => {

  const mountainLog = new MountainLog({
    user_id : req.auth_id,
    mountain_peak_id : req.body.mountain_peak_id,
    date : req.body.date,
  });
  
  MountainLog.create(mountainLog, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving mountain logs."
        });
      } else {
        res.status(200).json({
          success: true,
          message: data
        });
      }
  });
}

// @desc      Delete a mountain log
// @route     DELETE /mountain-log/:id
// @access    Private
exports.removeMountainLogs = (req, res, next) => {
  MountainLog.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mountain logs."
      });
    } else {
      res.status(200).json({
        success: true,
        message: data
      });
    }
  });
}
