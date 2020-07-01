const express = require("express");
const { updateWeather, getWeather } = require("../controllers/weather");
const parseWeather = require("../middleware/weather_parser");

const router = express.Router();

router
  .use(parseWeather)
  .route("/update")
  .get(updateWeather);

router.route("/").get(getWeather);

module.exports = router;
