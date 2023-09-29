const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
//const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(express.static(DIST_DIR));

// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.static("dist"));

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const app_url = process.env.APP_URL;
const spotify_url = process.env.SPOTIFY_URL;

app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get("/", (req, res) => {
    res.sendFile(HTML_FILE, function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.listen(port, function () {
 console.log('App listening on port: ' + port);
});

app.get('/login', function(req, res) {
  
  const authEndpoint = spotify_url + "authorize?";

  //var scope = 'user-read-private user-read-email';

  res.redirect(authEndpoint +
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      //scope: scope,
      redirect_uri: app_url,
      response_type: "token",
      show_dialog: true
    }));
});



// app.get('/refresh_token', function(req, res) {

//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   // TODO: request is deprecated, use axios instead
//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });
