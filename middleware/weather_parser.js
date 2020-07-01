const http = require("http");
const xml2js = require("xml2js");
const WeatherMountain = require("../models/WeatherMountains");
const parser = new xml2js.Parser({ attrkey: "ATTR" });



const parseWeather = async (req, res, next) => {

  console.log('running middlware');
  const weatherUrls = [
    "http://www.meteo.si/uploads/probase/www/observ/surface/text/sl/observation_KATARINA_latest.xml",
    "http://www.meteo.si/uploads/probase/www/observ/surface/text/sl/observation_KREDA-ICA_latest.xml",
    "http://www.meteo.si/uploads/probase/www/observ/surface/text/sl/observation_LISCA_latest.xml",
    "http://www.meteo.si/uploads/probase/www/observ/surface/text/sl/observation_RATECE_latest.xml",
    "http://www.meteo.si/uploads/probase/www/observ/surface/text/sl/observation_SLOVE-GRA_latest.xml",
    "http://www.meteo.si/uploads/probase/www/observ/surface/text/sl/observation_VOGEL_latest.xml",
    "http://www.meteo.si/uploads/probase/www/observ/surface/text/sl/observation_VOJSKO_latest.xml",
  ];

  var promises = [];

  weatherUrls.forEach((url) => {
    promises.push(
      new Promise((resolve, reject) => {
        http.get(url, function (res) {
          let data = "";
          res.on("data", function (stream) {
            data += stream;
          });
          res.on("end", function () {
            parser.parseString(data, function (error, result) {
              var weatherMountain;
              if (error === null) {
                weatherMountain = new WeatherMountain({
                  location: result.data.metData[0].domain_longTitle[0],
                  dateTime: result.data.metData[0].tsUpdated[0],
                  icon: result.data.metData[0].wwsyn_icon[0],
                  description: result.data.metData[0].wwsyn_longText[0],
                  t: result.data.metData[0].t[0],
                  windIcon: result.data.metData[0].ddff_icon[0],
                  windSpeed: result.data.metData[0].ff_val_kmh[0],
                  windMaxSpeed: result.data.metData[0].ffmax_val[0],
                  p: result.data.metData[0].p[0],
                  p_tendency: result.data.metData[0].pa_shortText[0],
                  rain: result.data.metData[0].rr24h_val[0],
                });
              } else {
                console.log(error);
              }
              resolve(weatherMountain);
            });
          });
        });
      })
    );
  });

  req.data = await Promise.all(promises);
  console.log(req.data);
  next();
};

module.exports = parseWeather;
