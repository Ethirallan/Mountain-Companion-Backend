const TravelImage = require('../models/TravelImage');

// @desc      Get all images
// @route     GET /travel-images/:travel_id
// @access    Private
exports.getTravelImages = (req, res, next) => {

  TravelImage.getAll(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving travel images."
        });
      } else {
        res.status(200).json({
          success: true,
          message: data
        });
      }
  });
}

// @desc      Update an image
// @route     PUT /stops/:id
// @access    Private
exports.updateTravelImage = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Update a stop' });
}

// @desc      Delete an image
// @route     DELETE /travels/:id
// @access    Private
exports.deleteTravelImage = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Delete a stop' });
}