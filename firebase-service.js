const admin = require('firebase-admin');
const bla = require('../gorskisopotnik-firebase-adminsdk-kqdgm-3f4d0e7e97.json');
// firebase
admin.initializeApp({
  credential: admin.credential.cert(bla),
  //databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

module.exports = admin;