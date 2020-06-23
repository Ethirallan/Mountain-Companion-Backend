const db = require('./db');

const Travel = function (travel) {
  this.id = travel.id;
  this.user_id = travel.user_id;
  this.date = travel.date;
  this.notes = travel.notes;
  this.thumbnail = travel.thumbnail;
  this.public = travel.public;
  this.created = travel.created;
};

Travel.create = (newTravel, result) => {
  db.query("INSERT INTO travel SET ?", newTravel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    newTravel.id = res.insertId;
    console.log("New travel created: ", { ...newTravel });
    result(null, { ...newTravel });
  });
};

Travel.findById = (travelId, result) => {
  db.query(`SELECT * FROM travel WHERE id = ${travelId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found travel: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Travel.getAll = (user_id, result) => {
  db.query(`SELECT * FROM travel WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("travels: ", res);
    result(null, res);
  });
};

Travel.updateById = (id, travel, result) => {
  db.query(
    "UPDATE travel SET date = ?, notes = ?, thumbnail = ?, public = ? WHERE id = ?",
    [travel.date, travel.notes, travel.thumbnail, travel.public, id],
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

      console.log("updated travel: ", { id: id, ...travel });
      result(null, { id: id, ...travel });
    }
  );
};

Travel.remove = (id, result) => {
  db.query("DELETE FROM travel WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted travel with id: ", id);
    result(null, res);
  });
};

module.exports = Travel;
