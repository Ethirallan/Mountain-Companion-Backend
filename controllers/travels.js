const Travel = require('../models/Travel');
const Stop = require('../models/Stop');
const TravelImage = require('../models/TravelImage');
const fs = require("fs");
const crypto = require('crypto');

const sharp = require("sharp");
const { encode } = require("blurhash");

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
  res.status(200).json({ success: true, message: 'Get a travel' });
}

// @desc      Create a travel
// @route     POST /travels
// @access    Private
exports.createTravel = (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const travel = new Travel({
    user_id : req.auth_id,
    date : req.body.date,
    notes : req.body.notes,
    public : 0,
  });

  var travelId;

  Travel.create(travel, async (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    }
    // else res.send(data);
    travelId = data.id;

    req.body.stops.forEach(el => {
      const stop = new Stop({
        travel_id : travelId,
        location : el.location,
        lat : el.lat,
        lng : el.lng,
        height : el.height,
        time : el.time
      });
  
      Stop.create(stop, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        }
        // else res.send(data);
      });
    });

    const encodeImageToBlurhash = path => new Promise((resolve, reject) => {
      sharp(path)
        .raw()
        .ensureAlpha()
        .resize(32, 32, { fit: "inside" })
        .toBuffer((err, buffer, { width, height }) => {
          if (err) return reject(err);
          resolve(encode(new Uint8ClampedArray(buffer), width, height, 7, 7));
        });
    });
  
    req.body.images.forEach(el => {
      el = el.replace('data:image/jpeg;base64,', '');
      var name = crypto.createHash("sha256").update(el).digest("hex");
      console.log(name);
      const imageBuffer = new Buffer(el, "base64");
      fs.writeFileSync(`../mc-photos/travels/${name}.png`, imageBuffer);

      encodeImageToBlurhash(`../mc-photos/travels/${name}.png`).then(hash => {
        const image = new TravelImage({
          travel_id : travelId,
          url : `https://mountain-companion.com/mc-photos/travels/${name}.png`,
          blurhash : hash
        });
  
        TravelImage.create(image, (err, data) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          }
        });
      });
    });
    res.status(200).json({ success: true, message: 'New travel created' });
  });
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
