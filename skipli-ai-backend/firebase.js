// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // đường dẫn tới file bạn vừa tải

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;