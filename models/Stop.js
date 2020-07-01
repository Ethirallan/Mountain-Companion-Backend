const db = require('./db');

const Stop = function (stop) {
  this.id = stop.id;
  this.travel_id = stop.travel_id;
  this.location = stop.location;
  this.lat = stop.lat;
  this.lng = stop.lng;
  this.height = stop.height;
  this.time = stop.time;
};

Stop.create = (newStop, result) => {
  db.query("INSERT INTO stop SET ?", newStop, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("New stop created: ", { id: res.insertId, ...newStop });
    result(null, { id: res.insertId, ...newStop });
  });
};

Stop.findById = (stopId, result) => {
  db.query(`SELECT * FROM stop WHERE id = ${stopId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found stop: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Stop.getAll = (travel_id, result) => {
  db.query(`SELECT * FROM stop WHERE travel_id = ${travel_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("stops: ", res);
    result(null, res);
  });
};

Stop.updateById = (id, stop, result) => {
  db.query(
    "UPDATE stop SET location = ?, lat = ?, lng = ?, height = ?, time = ? WHERE id = ?",
    [stop.location, stop.lat, stop.lng, stop.height, stop.time, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated stop: ", { id: id, ...stop });
      result(null, { id: id, ...stop });
    }
  );
};

Stop.remove = (id, result) => {
  db.query("DELETE FROM stop WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stop with id: ", id);
    result(null, res);
  });
};

Stop.removeAll = (travel_id, result) => {
  db.query("DELETE FROM stop WHERE travel_id = ?", travel_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stop with travel_id: ", travel_id);
    result(null, res);
  });
};

module.exports = Stop;