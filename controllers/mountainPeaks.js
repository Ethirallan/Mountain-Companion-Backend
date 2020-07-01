const MountainPeak = require('../models/MountainPeak');

// @desc      Get all mountain peaks
// @route     GET /mountain-peak
// @access    Public
exports.getMountainPeaks = (req, res, next) => {

  MountainPeak.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving stops."
        });
      } else {
        res.status(200).json({
          success: true,
          message: data
        });
      }
  });
}

// @desc      Get a mountain peak by id
// @route     GET /mountain-peak/:id
// @access    Public
exports.getMountainPeakById = (req, res, next) => {
  MountainPeak.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stops."
      });
    } else {
      res.status(200).json({
        success: true,
        message: data
      });
    }
  });
}