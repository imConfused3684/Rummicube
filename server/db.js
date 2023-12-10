const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;