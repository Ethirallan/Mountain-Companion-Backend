const db = require('./db');

const WeatherMountain = function (weatherMountain) {
  this.id = weatherMountain.id;
  this.location = weatherMountain.location;
  this.datetime = weatherMountain.dateTime;
  this.icon = weatherMountain.icon;
  this.description = weatherMountain.description;
  this.t = Number(weatherMountain.t);
  this.wind_icon = weatherMountain.windIcon;
  this.wind_speed = Number(weatherMountain.windSpeed);
  this.wind_max_speed = Number(weatherMountain.windMaxSpeed);
  this.p = Number(weatherMountain.p);
  this.p_tendency = weatherMountain.p_tendency;
  this.rain = Number(weatherMountain.rain);
  this.created = weatherMountain.created;
};

WeatherMountain.create = (newWeatherMountain, result) => {
  db.query("INSERT INTO weather_mountains SET ?", newWeatherMountain, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("New weatherMountain created: " + res.insertId + ' ', { id: res.insertId, ...newWeatherMountain });
    result(null, { id: res.insertId, ...newWeatherMountain });
  });
};

WeatherMountain.findById = (weatherMountainId, result) => {
  db.query(`SELECT * FROM weather_mountains WHERE id = ${weatherMountainId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found weatherMountain: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

WeatherMountain.getAll = (result) => {
  db.query('SELECT * FROM weather_mountains WHERE created > timestampadd(hour, -72, now()) GROUP BY location, datetime ORDER BY id DESC', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("weatherMountains: ", res);
    result(null, res);
  });
};

module.exports = WeatherMountain;
