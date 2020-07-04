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

// @desc      Create a stop
// @route     POST /stops
// @access    Private
exports.createStop = (req, res, next) => {
  const stop = new Stop({
    travel_id : req.body.travel_id,
    location : req.body.location,
    lat : req.body.lat,
    lng : req.body.lng,
    height : req.body.height,
    time : req.body.time
  });

  Stop.create(stop, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stop."
      });
    } else res.send(data);
  });
}

// @desc      Update a stop
// @route     PATCH /stops/:id
// @access    Private
exports.updateStop = (req, res, next) => {
  Stop.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting a stop."
      });
    } else {
      res.status(200).json({
        success: true,
        message: data
      });
    }
  });
}

// @desc      Delete a stop
// @route     DELETE /travels/:id
// @access    Private
exports.deleteStop = (req, res, next) => {
  Stop.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting a stop."
      });
    } else {
      res.status(200).json({
        success: true,
        message: data
      });
    }
  });
}