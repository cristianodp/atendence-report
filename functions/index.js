const functions = require("firebase-functions");
const express = require("express");
const path = require('path');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();

app.get("/*", function (req, res) {
    // res.send(__dirname)
    res.sendFile(path.resolve(__dirname, "../chamada-react-app/build", "index.html"));
});

exports.app = functions.https.onRequest(app);
