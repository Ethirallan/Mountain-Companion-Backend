const Travel = require('../models/Travel');
const Stop = require('../models/Stop');
const TravelImage = require('../models/TravelImage');
const fs = require("fs");
const { promisify } = require('util')
const crypto = require('crypto');
const sharp = require("sharp");
const { encode } = require("blurhash");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

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

// @desc      Get all travels
// @route     GET /travels
// @access    Private
exports.getTravels = (req, res, next) => {

  Travel.getAll(req.auth_id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      } else {
        res.status(200).json({
          success: true,
          message: data
        });
      }
  });
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
exports.createTravel = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  /**
   * save images to disk
   * create travel
   * insert travel
   * get travel id
   * add stops
   * add images
   * update travel hash
   */

  const saveImagesToDisk = async () =>  {
    if (req.body.images != undefined && req.body.images != null && req.body.images.length > 0) {

      await Promise.all(req.body.images.map(async (el) => {
        var name = crypto.createHash("sha256").update(el).digest("hex");
        el = el.replace('data:image/jpeg;base64,', '');
        const imageBuffer = new Buffer(el, "base64");
        await writeFileAsync(`../mc-photos/travels/${name}.png`, imageBuffer);
      }));
    }
    return 'Saved to the disk';
  };

  await saveImagesToDisk();

  var hash = await encodeImageToBlurhash(`../mc-photos/travels/${req.body.thumbnail}.png`);

  const travel = new Travel({
    user_id : req.auth_id,
    title : req.body.title,
    date : req.body.date,
    notes : req.body.notes,
    thumbnail : req.body.thumbnail,
    thumbnail_blurhash : hash,
    public : 0,
  });

  var travelId;

  Travel.create(travel, async (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Travel."
      });
    }
    // else res.send(data);
    travelId = data.id;

    if (req.body.stops != undefined && req.body.stops != null && req.body.stops.length > 0) {
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
    }


    const saveImagesToDb = async name => {
      await encodeImageToBlurhash(`../mc-photos/travels/${name}.png`).then(hash => {
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
    };

    if (req.body.images != undefined && req.body.images != null && req.body.images.length > 0) {
      req.body.images.forEach(async el => {
        var name = crypto.createHash("sha256").update(el).digest("hex");
        await saveImagesToDb(name);
      });
    }

    res.status(200).json({ success: true, message: 'New travel created' });
  });
}

// @desc      Update travels
// @route     PUT /travels/:id
// @access    Private
exports.updateTravel = (req, res, next) => {
  Travel.updateById(req.params.id, req.body, (err, data) => {
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

// @desc      Delete travels
// @route     DELETE /travels/:id
// @access    Private
exports.deleteTravel = (req, res, next) => {
  Travel.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving travel images."
      });
    } else {
      Stop.removeAll(req.params.id, (err, data) => {

      });
      TravelImage.removeAll(req.params.id, (err, data) => {

      });
      res.status(200).json({
        success: true,
        message: data
      });
    }
  });
}
