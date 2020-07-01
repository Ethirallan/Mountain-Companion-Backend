const db = require('./db');

const User = function(user) {
  this.uid = user.uid;
  this.username = user.username;
  this.email = user.email;
  this.name = user.name;
  this.surname = user.surname;
  this.created = user.created;
  this.premium = user.premium;
};

User.create = (newUser, result) => {
  db.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("New user created: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (user_id, result) => {
	console.log(user_id);
  db.query(`SELECT * FROM user WHERE uid = '${user_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.getAll = (result) => {
  db.query(`SELECT * FROM user`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (uid, user, result) => {
  db.query(
    "UPDATE user SET username = ?, mail = ?, name = ?, surname = ?, created = ?, premium = ? WHERE uid = ?",
    [user.username, user.email, user.name, user.surname, user.created, user.premium, uid],
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (uid, result) => {
  db.query("DELETE FROM user WHERE uid = ?", uid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", uid);
    result(null, res);
  });
};

module.exports = User;
