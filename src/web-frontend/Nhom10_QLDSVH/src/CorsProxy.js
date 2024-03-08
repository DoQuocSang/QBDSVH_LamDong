// functions/corsProxy.js
const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.corsProxy = functions.https.onRequest(async (req, res) => {
  const modelPath = `https://qbdsvhlamdong.web.app${req.url}`; // Adjust the URL accordingly

  try {
    const response = await fetch(modelPath);
    const modelData = await response.blob();
    res.set('Access-Control-Allow-Origin', '*'); // Set CORS headers
    res.status(200).send(modelData);
  } catch (error) {
    console.error('Error fetching the model:', error);
    res.status(500).send('Internal Server Error');
  }
});
