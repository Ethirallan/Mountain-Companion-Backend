const db = require('./db');

const MountainLog = function (mountainLog) {
  this.id = mountainLog.id;
  this.user_id = mountainLog.user_id;
  this.mountain_peak_id = mountainLog.mountain_peak_id;
  this.date = mountainLog.date;
  this.created = mountainLog.created;
};

MountainLog.create = (newMountainLog, result) => {
  db.query("INSERT INTO mountain_log SET ?", newMountainLog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("New MountainLog created: ", { id: res.insertId, ...newMountainLog });
    result(null, { id: res.insertId, ...newMountainLog });
  });
};

MountainLog.findById = (mountainLogId, result) => {
  db.query(`SELECT * FROM mountain_log WHERE id = ${mountainLogId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found mountain_log: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

MountainLog.getAll = (user_id, result) => {
  db.query(`SELECT * FROM mountain_log WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("MountainLogs: ", res);
    result(null, res);
  });
};

MountainLog.remove = (id, result) => {
  db.query("DELETE FROM mountain_log WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted MountainLog with id: ", id);
    result(null, res);
  });
};

module.exports = MountainLog;