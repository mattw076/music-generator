import React, { useState, useEffect } from "react";
import "./App.scss";

import HeaderBar from "./components/HeaderBar/HeaderBar.jsx";
import GenrePicker from "./components/GenrePicker/GenrePicker.jsx";

const App = () => {

    const [spotifyToken, setSpotifyToken] = useState(
        document.cookie.split("; ").find((row) => row.startsWith("spotify_token="))?.split("=")[1] || ""
    );

    useEffect(() => {
        document.cookie = `spotify_token=${spotifyToken}`;
    }, [spotifyToken]);

    return (
        <div>
            <HeaderBar spotifyToken={spotifyToken} setSpotifyToken={setSpotifyToken}/>
            <GenrePicker spotifyToken={spotifyToken} setSpotifyToken={setSpotifyToken} />
        </div>
    )
};

export default App;
