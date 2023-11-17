const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const fetch = require("node-fetch");
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const mockResponse = {
    foo: 'bar',
    bar: 'foo'
};
app.use(express.static(DIST_DIR));

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const app_url = process.env.APP_URL;
const spotify_url = process.env.SPOTIFY_URL;

app.get('/api', (req, res) => {
    res.send(mockResponse);
});
app.get("/", (req, res) => {

    console.log(process.env);
    console.log(process.env.APP_URL);
    console.log(process.env.SPOTIFY.URL);
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
app.get('/login', function (req, res) {

    const authEndpoint = spotify_url + "authorize?";

    // State is optional, but recommended to protect against cross-site request forgery (we check that the value of state returned by the request is the same as the one we sent)
    // state is stored in cookies to compare later
    const state = crypto.randomBytes(8).toString('hex');
    res.cookie("spotify_auth_state", state, { sameSite: "Strict" });

    // TODO: don't think state is being sent back in query params/being saved in backend cookie properly

    //var scope = 'user-read-private user-read-email';

    res.redirect(authEndpoint +
        new URLSearchParams({
            client_id: client_id,
            //scope: scope,
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
app.get('/access_token', function (req, res) {

    const code = req.query.code || null;
    const state = req.query.state

    // If state received back is not the same one we sent, display error
    const stateCookie = req.headers.cookie.split("; ").find((row) => row.startsWith("spotify_auth_state="))?.split("=")[1];
    if (state === null || state !== stateCookie) {
        // Q: What does # signify in the example given below
        // res.redirect('/#' + new URLSearchParams({ error: 'state_mismatch' }));
        res.redirect('/' + new URLSearchParams({ error: 'state_mismatch' }));
    } else {
        const endpoint = spotify_url + "api/token";
        const queryParams = {
            code: code,
            redirect_uri: app_url,
            grant_type: 'authorization_code'
        };
        const headers = {
            "Authorization": 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            "Content-Type": 'application/x-www-form-urlencoded'
        };

        // get the access token and return repsonse containing access token to client-side
        fetch(endpoint, { method: "POST", headers: headers, body: new URLSearchParams(queryParams) })
            .then(response => response.json())
            .then(data => res.send(data))
            .catch(err => console.log(err));
    };

    res.clearCookie("spotify_auth_state");
});

app.get('/refresh_token', function (req, res) {

    const refresh_token = req.query.refresh_token || null;

    const endpoint = spotify_url + "api/token";

    const queryParams = {
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
    };

    const headers = {
        "Authorization": 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
        "Content-Type": 'application/x-www-form-urlencoded'
    };

    console.log(endpoint + "?" + new URLSearchParams(queryParams));

    fetch(endpoint, { method: "POST", headers: headers, body: new URLSearchParams(queryParams) })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(err => console.log(err));
});
