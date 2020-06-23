const db = require('./db');

const TravelImage = function (travelImage) {
  this.id = travelImage.id;
  this.travel_id = travelImage.travel_id;
  this.url = travelImage.url;
  this.blurhash = travelImage.blurhash;
};

TravelImage.create = (newTravelImage, result) => {
  db.query("INSERT INTO travel_image SET ?", newTravelImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("New travelImage created: ", { id: res.insertId, ...newTravelImage });
    result(null, { id: res.insertId, ...newTravelImage });
  });
};

TravelImage.findById = (travelImageId, result) => {
  db.query(`SELECT * FROM travel_image WHERE id = ${travelImageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found travelImage: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

TravelImage.getAll = (travel_id, result) => {
  db.query(`SELECT * FROM travel_image WHERE travel_id = ${travel_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("travelImages: ", res);
    result(null, res);
  });
};

TravelImage.updateById = (id, travelImage, result) => {
  db.query(
    "UPDATE travel_image SET url = ?, blurhas = ? WHERE id = ?",
    [travelImage.url, id],
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

      console.log("updated travelImage: ", { id: id, ...travelImage });
      result(null, { id: id, ...travelImage });
    }
  );
};

TravelImage.remove = (id, result) => {
  db.query("DELETE FROM travel_image WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted travelImage with id: ", id);
    result(null, res);
  });
};

module.exports = TravelImage;