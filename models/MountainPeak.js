const db = require('./db');

const MountainPeak = function (mountainPeak) {
  this.id = mountainPeak.id;
  this.name = mountainPeak.name;
  this.lat = mountainPeak.lat;
  this.lng = mountainPeak.lng;
  this.height = mountainPeak.height;
  this.created = mountainPeak.created;
};

MountainPeak.getAll = (result) => {
  db.query('SELECT * FROM mountain_peak', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("MountainPeaks: ", res);
    result(null, res);
  });
};

MountainPeak.findById = (mountainPeakId, result) => {
  db.query(`SELECT * FROM mountain_peak WHERE id = ${mountainPeakId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found MountainPeak: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = MountainPeak;