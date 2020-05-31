// @desc      Get all travels
// @route     GET /travels
// @access    Private
exports.getTravels = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Get all travels' });
}

// @desc      Get a travel
// @route     GET /travels/:id
// @access    Private
exports.getTravel = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Get a travels' });
}

// @desc      Create a travel
// @route     POST /travels
// @access    Private
exports.createTravel = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Create a travels' });
}

// @desc      Update travels
// @route     PUT /travels/:id
// @access    Private
exports.updateTravel = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Update a travel' });
}

// @desc      Delete travels
// @route     DELETE /travels/:id
// @access    Private
exports.deleteTravel = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Delete a travel' });
}