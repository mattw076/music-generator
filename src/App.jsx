import React, { useState, useEffect } from "react";
import "./App.scss";

import HeaderBar from "./components/HeaderBar/HeaderBar.jsx";
import GenrePicker from "./components/GenrePicker/GenrePicker.jsx";

const App = () => {

    const [spotifyToken, setSpotifyToken] = useState(
        document.cookie.split("; ").find((row) => row.startsWith("spotify_token="))?.split("=")[1] || ""
    );

    useEffect(() => {
        document.cookie = `spotify_token=${spotifyToken}; SameSite=Strict`;
    }, [spotifyToken]);

    return (
        <div>
            <HeaderBar spotifyToken={spotifyToken} setSpotifyToken={setSpotifyToken}/>
            <GenrePicker spotifyToken={spotifyToken} setSpotifyToken={setSpotifyToken} />
        </div>
    )
};

export default App;


// TODO: firefox "Stylesheet could not be loaded" warning

// TODO: (3) - other console errors (e.g. source map)

// TODO: (4) - deploy (hiroku?)