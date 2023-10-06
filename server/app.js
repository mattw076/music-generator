const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const fetch = require("node-fetch");
const crypto = require('crypto');
const { URL } = require('url');

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

// Initiate log in to Spotify by requesting an authorization code
app.get('/login', function(req, res) {
  
  const authEndpoint = spotify_url + "authorize?";

  // State is optional, but recommended to protect against cross-site request forgery (we check that the value of state returned by the request is the same as the one we sent)
  // state is stored in cookies to compare later
  const state = crypto.randomBytes(8).toString('hex');
  res.cookie("spotify_auth_state", state);

  //var scope = 'user-read-private user-read-email';

  res.redirect(authEndpoint +
    new URLSearchParams({
      client_id: client_id,
      //scope: scope,
      //redirect_uri: app_url + "access_token",
      redirect_uri: app_url,
      response_type: "code",
      state: state,
      show_dialog: true
    })
  );
});

/**
 * Get an access token to be used in API calls to Spotify
 * @param code authorization code received from the /login route
 * @param state state received back from the /login call
 * @returns {object} {
   "access_token": "NgCXRK...MzYjw",
   "token_type": "Bearer",
   "scope": "user-read-private user-read-email",
   "expires_in": 3600,
   "refresh_token": "NgAagA...Um_SHo"
  }
 */
app.get('/access_token', function(req, res) {
  
  const code = req.query.code || null;
  const state = req.query.state
  
  // If state received back is not the same one we sent, display error

  // TODO: cookies is empty for some reason (can see it in the browser though)
  //if (state === null || state !== req.cookies["spotify_auth_state"]) {
  if (state === null) {
    // Q: is below the right route? What does # signify
    res.redirect('/#' + new URLSearchParams({error: 'state_mismatch'}));

  } else {
      const endpoint = spotify_url + "api/token";
      const queryParams = {
        code: code,
        redirect_uri: app_url,
        grant_type: 'authorization_code'
      };
      const headers = { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')), "Content-Type": 'application/x-www-form-urlencoded' };

      // get the access token and return repsonse containing access token to client-side
      fetch(endpoint, { method: "POST", headers: headers, body: new URLSearchParams(queryParams) })
      .then(response => {
        response.json().then(data => {
          // console.log(data);
          res.send(data);
        })
      }) 
      .catch(err => console.log(err));
  };

  res.clearCookie("spotify_auth_state");
});


// TODO: *first* - refresh_token

// app.get('/refresh_token', function(req, res) {

//   const refresh_token = req.query.refresh_token;

//   const authOptions = {
//     headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
//     params: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     }
//   };

 
//   axios.post(spotify_url + "api/token", authOptions)
// .then(function(error, response) {
//     if (!error && response.statusCode === 200) {
//       const access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });
