const Stop = require('../models/Stop');


// @desc      Get all stops
// @route     GET /stops
// @access    Private
exports.getStops = (req, res, next) => {

  Stop.getAll(req.params.id, (err, data) => {
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

// @desc      Update a stop
// @route     PUT /stops/:id
// @access    Private
exports.updateStop = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Update a stop' });
}

// @desc      Delete a stop
// @route     DELETE /travels/:id
// @access    Private
exports.deleteStop = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Delete a stop' });
}
