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

// @desc      Add new image
// @route     POST /travel-images
// @access    Private
exports.createTravelImage = async (req, res, next) => {

  const saveImagesToDisk = async name =>  {
    req.body.image = req.body.image.replace('data:image/jpeg;base64,', '');
    const imageBuffer = new Buffer(req.body.image, "base64");
    await writeFileAsync(`../mc-photos/travels/${name}.png`, imageBuffer);
    
    return await encodeImageToBlurhash(`../mc-photos/travels/${name}.png`);
  };

  var name = crypto.createHash("sha256").update(req.body.image).digest("hex");

  const image = new TravelImage({
    travel_id : req.body.travel_id,
    url : `https://mountain-companion.com/mc-photos/travels/${name}.png`,
    blurhash : await saveImagesToDisk(name),
  });

  TravelImage.create(image, (err, data) => {
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


// @desc      Delete an image
// @route     DELETE /travels/:id
// @access    Private
exports.deleteTravelImage = async (req, res, next) => {
  TravelImage.remove(req.params.id, (err, data) => {
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