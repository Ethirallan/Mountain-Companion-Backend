const WeatherMountain = require("../models/WeatherMountains");

// @desc      Update weather
// @route     POST /weather/
// @access    Public
exports.updateWeather = (req, res, next) => {
  console.log(req.data);
  req.data.forEach((weatherMountain) => {
    WeatherMountain.create(weatherMountain, (err, data) => {
      console.log(err);
      console.log(data);
    });
  });
  res.status(200).json({ success: true, message: "Got new weather data" });
};

exports.getWeather = (req, res, next) => {
  WeatherMountain.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    } else res.send(data);
  });
};
